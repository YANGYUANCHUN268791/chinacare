'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    country: '',
    specialty: '',
    conditionDescription: '',
    urgency: 'routine',
    preferredHospital: '',
    budgetRange: '',
    travelMonth: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: '',
          country: '',
          specialty: '',
          conditionDescription: '',
          urgency: 'routine',
          preferredHospital: '',
          budgetRange: '',
          travelMonth: '',
          additionalInfo: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('contact.title', 'Contact Us')}
      </h2>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {t('contact.success', 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {t('contact.error', 'Sorry, there was an error. Please try again or contact us directly.')}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.firstName', 'First Name')} *
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.lastName', 'Last Name')} *
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.phone', 'Phone / WhatsApp')} *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.age', 'Age')}
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.country', 'Country')} *
          </label>
          <input
            type="text"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Specialty */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.specialty', 'Medical Specialty Needed')} *
          </label>
          <select
            name="specialty"
            required
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('contact.selectSpecialty', 'Select a specialty...')}</option>
            <option value="cardiology">Cardiology (心脏科)</option>
            <option value="oncology">Oncology (肿瘤科)</option>
            <option value="neurology">Neurology (神经科)</option>
            <option value="orthopedics">Orthopedics (骨科)</option>
            <option value="general">General Surgery (普外科)</option>
            <option value="checkup">Comprehensive Checkup (全面体检)</option>
            <option value="other">Other (其他)</option>
          </select>
        </div>

        {/* Condition Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.condition', 'Condition Description')} *
          </label>
          <textarea
            name="conditionDescription"
            required
            rows={4}
            value={formData.conditionDescription}
            onChange={handleChange}
            placeholder={t('contact.conditionPlaceholder', 'Please describe your medical condition or reason for visiting...')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.urgency', 'Urgency')}
          </label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="routine">{t('contact.urgencyRoutine', 'Routine (within 3 months)')}</option>
            <option value="urgent">{t('contact.urgencyUrgent', 'Urgent (within 1 month)')}</option>
            <option value="emergency">{t('contact.urgencyEmergency', 'Emergency (ASAP)')}</option>
          </select>
        </div>

        {/* Preferred Hospital */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.hospital', 'Preferred Hospital (Optional)')}
          </label>
          <input
            type="text"
            name="preferredHospital"
            value={formData.preferredHospital}
            onChange={handleChange}
            placeholder={t('contact.hospitalPlaceholder', 'e.g., Peking Union Medical College Hospital')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.budget', 'Budget Range (USD)')}
          </label>
          <select
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('contact.selectBudget', 'Select budget range...')}</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000-20000">$10,000 - $20,000</option>
            <option value="20000-50000">$20,000 - $50,000</option>
            <option value="50000+">$50,000+</option>
            <option value="undecided">{t('contact.undecided', 'Undecided')}</option>
          </select>
        </div>

        {/* Travel Month */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.travelMonth', 'Preferred Travel Month')}
          </label>
          <input
            type="month"
            name="travelMonth"
            value={formData.travelMonth}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Additional Info */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.additionalInfo', 'Additional Information (Optional)')}
          </label>
          <textarea
            name="additionalInfo"
            rows={3}
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder={t('contact.additionalInfoPlaceholder', 'Any other details you would like to share...')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? t('contact.submitting', 'Submitting...') : t('contact.submit', 'Submit Inquiry')}
        </button>
      </div>
    </form>
  );
}
