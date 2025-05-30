'use client';

import React, { useState, useCallback } from 'react';
import {
  validateEmail,
  validateName,
  validateMessage,
  sanitizeInput,
  contactFormLimiter,
  logSecurityEvent,
} from '../utils/security';
import LoadingSpinner from './LoadingSpinner';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

const SecureContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (2-50 characters, letters only)';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (!validateMessage(formData.message)) {
      newErrors.message = 'Message must be between 10-1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // Sanitize input
      const sanitizedValue = sanitizeInput(value);

      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue,
      }));

      // Clear error for this field
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Check rate limiting
      const clientId = 'contact_form'; // In a real app, you might use IP or user ID
      if (!contactFormLimiter.isAllowed(clientId)) {
        const remainingTime = Math.ceil(contactFormLimiter.getRemainingTime(clientId) / 1000 / 60);
        setStatus('rate_limited');
        setErrors({
          general: `Too many attempts. Please try again in ${remainingTime} minutes.`,
        });
        logSecurityEvent('Rate limit exceeded', { clientId, attempts: submitAttempts });
        return;
      }

      // Validate form
      if (!validateForm()) {
        logSecurityEvent('Form validation failed', { errors });
        return;
      }

      setStatus('submitting');
      setSubmitAttempts(prev => prev + 1);

      try {
        const response = await fetch('https://formspree.io/f/mwpognoa', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            message: sanitizeInput(formData.message),
            _subject: 'New Portfolio Contact Form Submission',
            _replyto: sanitizeInput(formData.email),
          }),
        });

        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setErrors({});
          setSubmitAttempts(0);

          // Reset status after 5 seconds
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setStatus('error');
        setErrors({
          general: 'Failed to send message. Please try again or contact me directly.',
        });
        logSecurityEvent('Form submission failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        // Reset error status after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setErrors(prev => {
            const { general, ...rest } = prev;
            return rest;
          });
        }, 5000);
      }
    },
    [formData, validateForm, submitAttempts]
  );

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return {
          text: "🚀 Message sent successfully! I'll get back to you soon.",
          color: 'text-green-400',
        };
      case 'error':
        return { text: '❌ Failed to send message. Please try again.', color: 'text-red-400' };
      case 'rate_limited':
        return {
          text: '⏱️ Too many attempts. Please wait before trying again.',
          color: 'text-yellow-400',
        };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-200">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={status === 'submitting'}
          className={`w-full rounded-lg border bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:outline-none ${
            errors.name
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-purple-500/30 focus:border-purple-400 focus:ring-purple-500/50'
          }`}
          placeholder="Your name"
          maxLength={50}
          autoComplete="name"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-200">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={status === 'submitting'}
          className={`w-full rounded-lg border bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:outline-none ${
            errors.email
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-purple-500/30 focus:border-purple-400 focus:ring-purple-500/50'
          }`}
          placeholder="your.email@example.com"
          maxLength={254}
          autoComplete="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-200">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          disabled={status === 'submitting'}
          className={`resize-vertical w-full rounded-lg border bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:outline-none ${
            errors.message
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-purple-500/30 focus:border-purple-400 focus:ring-purple-500/50'
          }`}
          placeholder="Your message..."
          maxLength={1000}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        <div className="mt-1 flex justify-between">
          {errors.message ? (
            <p id="message-error" className="text-sm text-red-400" role="alert">
              {errors.message}
            </p>
          ) : (
            <span></span>
          )}
          <span className="text-xs text-gray-400">{formData.message.length}/1000</span>
        </div>
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
          <p className="text-sm text-red-400" role="alert">
            {errors.general}
          </p>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`rounded-lg border border-purple-500/20 bg-slate-800/30 p-3 ${statusMessage.color}`}
        >
          <p className="text-sm">{statusMessage.text}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting' || status === 'rate_limited'}
        className="group relative w-full transform rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-describedby="submit-status"
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center">
            <LoadingSpinner size="sm" color="white" />
            <span className="ml-2">Sending...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center">
            ⚛️ Send Quantum Message
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        * Required fields. Your information is secure and will not be shared.
      </p>
    </form>
  );
};

export default SecureContactForm;
