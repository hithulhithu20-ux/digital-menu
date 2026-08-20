import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, ShipWheel, AlertCircle, CheckCircle2 } from 'lucide-react'

const credentials = {
  admin: {
    id: 'admin@dineqr.com',
    password: 'admin123',
    label: 'ADMIN PORTAL',
    title: 'Welcome back.',
    subtitle: 'Manage your restaurant from one place.',
    footer: 'Secure restaurant administration',
  },
  waiter: {
    id: 'waiter@dineqr.com',
    password: 'waiter123',
    label: 'WAITER PORTAL',
    title: 'Ready to serve.',
    subtitle: 'Take orders and manage tables in real time.',
    footer: 'Secure service operations',
  },
}

// Cinematic Bank Locker Input Component
const VaultInput = ({ label, icon: Icon, type, value, onChange, placeholder, isPassword, showPassword, setShowPassword }) => {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const inputRef = useRef(null)
  
  // Keep it unlocked if it has a value
  const open = isUnlocked || value.length > 0;

  const handleUnlock = () => {
    if (!open) {
      setIsUnlocked(true)
      // Focus input after door opens
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus()
      }, 400)
    }
  }

  const handleBlur = () => {
    if (value.trim() === '') {
      setIsUnlocked(false)
    }
  }

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold tracking-[0.15em] text-zinc-400 uppercase">
        {label}
      </label>
      
      <div 
        className={`relative flex h-14 items-center rounded-xl border bg-[#0c121e] overflow-hidden transition-colors duration-500 cursor-text ${open ? 'border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-white/10 shadow-none'}`}
        onClick={handleUnlock}
      >
        {/* Actual Input Layer */}
        <div className={`absolute inset-0 flex items-center justify-between px-4 text-zinc-500 transition-opacity duration-700 delay-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 w-full">
            <Icon size={18} className="text-[#f59e0b]" />
            <input
              ref={inputRef}
              type={inputType}
              value={value}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="w-full bg-transparent text-base text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
          
          {isPassword && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowPassword(!showPassword); }}
              className="text-zinc-500 hover:text-white transition-colors ml-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {/* Cinematic Vault Doors Overlay */}
        <div className={`absolute inset-0 z-10 flex pointer-events-none`}>
          {/* Left Door */}
          <div className={`h-full w-1/2 bg-gradient-to-r from-[#131b2b] to-[#0c121e] border-r border-[#05070a] shadow-[5px_0_15px_rgba(0,0,0,0.5)] flex items-center justify-end transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? '-translate-x-full' : 'translate-x-0'}`}>
             <div className="w-1.5 h-6 bg-black/60 rounded-l-full mr-2 shadow-inner" />
          </div>
          
          {/* Right Door */}
          <div className={`h-full w-1/2 bg-gradient-to-l from-[#131b2b] to-[#0c121e] border-l border-[#05070a] shadow-[-5px_0_15px_rgba(0,0,0,0.5)] flex items-center justify-start transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-x-full' : 'translate-x-0'}`}>
             <div className="w-1.5 h-6 bg-black/60 rounded-r-full ml-2 shadow-inner" />
          </div>
          
          {/* Center Lock Mechanism */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#070b14] border border-[#f59e0b]/30 shadow-[0_0_15px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(245,158,11,0.2)] transition-all duration-[600ms] ${open ? 'scale-[2] opacity-0' : 'scale-100 opacity-100'}`}>
            <div className={`absolute inset-0 rounded-full border-t border-b border-[#f59e0b]/50 ${open ? 'animate-spin' : ''}`} />
            <Lock size={12} className="text-[#f59e0b]" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  
  const [loginType, setLoginType] = useState('admin')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeCreds = credentials[loginType]

  const handleAutofill = () => {
    setUserId(activeCreds.id)
    setPassword(activeCreds.password)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (userId.trim() === '' || password.trim() === '') {
      setError('Please unlock all fields and enter credentials.')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      if (userId === activeCreds.id && password === activeCreds.password) {
        setSuccess('Authentication successful.')
        setTimeout(() => {
          navigate('/admin/tables')
        }, 500)
      } else {
        setIsSubmitting(false)
        setError('Invalid credentials. Please try again.')
      }
    }, 800)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#070b14] font-['Plus_Jakarta_Sans',sans-serif] text-white selection:bg-[#f59e0b]/30 selection:text-amber-200">
      
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[#f59e0b]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] p-6 sm:p-8 animate-fade-in-up">
        
        {/* Role Switcher */}
        <div className="mb-12">
          <div className="inline-flex rounded-full border border-white/10 bg-[#0c121e] p-1">
            <button
              type="button"
              onClick={() => { setLoginType('admin'); setError(''); setSuccess(''); }}
              className={`rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.15em] transition-all duration-300 ${
                loginType === 'admin' 
                  ? 'border border-[#f59e0b]/50 bg-transparent text-white shadow-[inset_0_0_15px_rgba(245,158,11,0.2)]' 
                  : 'border border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              ADMIN
            </button>
            <button
              type="button"
              onClick={() => { setLoginType('waiter'); setError(''); setSuccess(''); }}
              className={`rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.15em] transition-all duration-300 ${
                loginType === 'waiter' 
                  ? 'border border-[#f59e0b]/50 bg-transparent text-white shadow-[inset_0_0_15px_rgba(245,158,11,0.2)]' 
                  : 'border border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              WAITER
            </button>
          </div>
        </div>

        {/* Headers */}
        <div className="mb-6">
          <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">
            {activeCreds.label}
          </p>
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white">
            {activeCreds.title}
          </h1>
          <p className="text-[15px] text-zinc-400 font-medium">
            {activeCreds.subtitle}
          </p>
        </div>

        {/* Quick Demo Autofill */}
        <div className="mb-8 flex justify-end">
          <button 
            onClick={handleAutofill}
            type="button"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#f59e0b] transition-colors hover:text-amber-400"
          >
            <Sparkles size={14} /> Auto-fill Demo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <VaultInput 
            label="USER ID / EMAIL"
            icon={Mail}
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your ID or email"
          />

          <VaultInput 
            label="PASSWORD"
            icon={Lock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            isPassword={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
              <div className="relative flex h-5 w-5 items-center justify-center rounded-[4px] border-2 border-[#f59e0b] bg-[#f59e0b]">
                <input type="checkbox" className="absolute h-0 w-0 opacity-0" defaultChecked />
                <svg className="h-3.5 w-3.5 text-[#070b14]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium">Remember me</span>
            </label>
            <button type="button" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Forgot password?
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#f97316] px-6 py-4 font-bold tracking-[0.1em] text-white shadow-[0_10px_25px_rgba(249,115,22,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
            
            {isSubmitting ? (
              <ShipWheel size={22} className="animate-spin" />
            ) : (
              <>
                <span className="text-base uppercase">Sign In</span>
                <ArrowRight size={20} className="absolute right-6 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
          <ShieldCheck size={18} className="text-[#f59e0b]" />
          <span>{activeCreds.footer}</span>
        </div>

      </div>
    </div>
  )
}
