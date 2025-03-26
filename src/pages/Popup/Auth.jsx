import React, { useState } from 'react';
import { ACTION, RESPONSE, sendMessage } from '../utils';
import { setShortcutsToStorage } from '../Content';

export default function Auth({ onUserLoggedIn }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = (e) => {
    e.preventDefault();

    const onResponse = (response) => {
      if (response.action === RESPONSE.SUCCESS) {
        setOtpSent(true);
      } else if (response.action === RESPONSE.ERROR) {
        alert('sendOtp failed', response.message);
      }
      setLoading(false);
    };

    setLoading(true);
    sendMessage({ action: ACTION.SEND_OTP, email }, onResponse);
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    const onResponse = (response) => {
      if (response.action === RESPONSE.SUCCESS) {
        onUserLoggedIn();
        sendMessage({ action: ACTION.GET_SHORTCUTS }, ({ action, res }) => {
          if (action !== RESPONSE.SUCCESS) return;
          const fetchedShortcuts = res.data[0].data || {};
          setShortcutsToStorage(fetchedShortcuts);
        });
      } else if (response.action === RESPONSE.ERROR) {
        alert('verifyOtp failed', response.message);
      }
      setLoading(false);
    };

    setLoading(true);
    sendMessage({ action: ACTION.VERIFY_OTP, email, otp }, onResponse);
  };

  return (
    <div className="flex flex-col justify-between h-full gap-2">
      <p className="text-base">Sign in with Otp</p>
      {!otpSent ? (
        <form className="w-full space-y-2" onSubmit={sendOtp}>
          <input
            className="w-full input input-bordered input-sm"
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />
          <button type="submit" className="btn-sm btn btn-neutral" disabled={loading}>
            {loading ? <span>Loading</span> : <span>Send OTP</span>}
          </button>
        </form>
      ) : (
        <form className="w-full space-y-2" onSubmit={verifyOtp}>
          <input
            className="w-full input input-bordered input-sm"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            required={true}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit" className="btn-sm btn btn-neutral" disabled={loading}>
            {loading ? <span>Loading</span> : <span>Login</span>}
          </button>
        </form>
      )}
    </div>
  );
}
