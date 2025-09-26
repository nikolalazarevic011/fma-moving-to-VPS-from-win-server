import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Check your email (spam folder as well) for the reset link.');
      } else {
        setMessage(data.error || '❌ Something went wrong');
      }
    } catch (error) {
      setMessage('❌ Failed to send request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-xl px-8 pt-4 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center text-primary">
          Forgot Password
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Enter your email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 bg-blue-100 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
            required
          />
        </div>

        {message && (
          <p className="mb-4 text-sm text-center text-gray-700">{message}</p>
        )}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 font-bold text-white rounded bg-primary focus:shadow-outline focus:outline-none"
          >
            {submitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>
    </div>
  );
}