import { useState } from 'react'
import { ArrowRight, Eye, Lock, Mail, QrCode, ShieldCheck } from 'lucide-react'

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

export default function Login() {
  const [loginType, setLoginType] = useState('admin')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const activeCreds = credentials[loginType]

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (userId.trim() === '' || password.trim() === '') {
      setError('Please enter both ID and password.')
      return
    }

    if (userId === activeCreds.id && password === activeCreds.password) {
      setSuccess(`${loginType === 'admin' ? 'Admin' : 'Waiter'} login successful.`)
      return
    }

    setError('Invalid credentials. Please try again.')
  }

  return (
    <div className="min-h-screen w-full bg-[#050a12] p-0 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] bg-[#060d18] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
        <div className="relative hidden w-[52%] flex-col justify-between overflow-hidden bg-[#2a1406] p-8 sm:flex lg:p-10">
          <div className="relative z-10 flex items-center gap-3 text-white/90">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#f59e0b]/70 bg-[#0a0e14]">
              <QrCode size={16} className="text-[#f59e0b]" />
            </div>
            <span className="text-[1.05rem] font-extrabold tracking-[-0.06em] sm:text-[1.5rem]">
              DINE QR
            </span>
          </div>

          <div className="relative z-10 -mt-12 mb-10 ml-1">
            <div className="text-[clamp(5.5rem,6vw,13rem)] font-extrabold leading-[0.72] tracking-[-0.09em] text-white/90">
              <div>SCAN</div>
              <div>N</div>
              <div>ORD</div>
              <div>ER</div>
              <div>
                <span className="text-[#f59e0b]">ENJ</span>
                <span>OY.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-60 text-[1.05rem] leading-[1.35] text-white/80">
            <span className="block text-[#f59e0b] font-semibold">Restaurant</span>
            <span className="block">operations,</span>
            <span className="block">reimagined.</span>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_46%,rgba(245,158,11,0.32),transparent_18%),linear-gradient(90deg,rgba(84,42,13,0.95)_0%,rgba(33,17,6,0.82)_34%,rgba(7,12,20,0.96)_100%)]" />
        </div>

        <div className="relative flex w-full flex-1 items-center justify-center bg-[#040b14] px-5 py-8 sm:px-8 lg:px-10">
          <div className="absolute left-0 top-0 h-full w-px border border-l border-gray-600" />
          <div className="w-full max-w-125">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#f59e0b]/70 bg-[#0a0e14]">
                  <QrCode size={18} className="text-[#f59e0b]" />
                </div>
                <span className="text-[1.05rem] font-bold tracking-[-0.06em] text-white">DINE QR</span>
              </div>

              <div className="flex rounded-full border border-[#1d2b3d] bg-[#0a111c] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setLoginType('admin')
                    setError('')
                    setSuccess('')
                  }}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] transition-all ${
                    loginType === 'admin' ? 'bg-[#101b2b] text-white shadow-[inset_0_0_0_1px_rgba(245,158,11,0.6)]' : 'text-zinc-500'
                  }`}
                >
                  ADMIN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginType('waiter')
                    setError('')
                    setSuccess('')
                  }}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] transition-all ${
                    loginType === 'waiter' ? 'bg-[#101b2b] text-white shadow-[inset_0_0_0_1px_rgba(245,158,11,0.6)]' : 'text-zinc-500'
                  }`}
                >
                  WAITER
                </button>
              </div>
            </div>

            <div className="mb-7 pt-3">
              <div className="mb-4 text-[0.7rem] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                {activeCreds.label}
              </div>
              <h1 className="text-[3.1rem] font-extrabold leading-[0.95] tracking-[-0.08em] text-white">
                {activeCreds.title}
              </h1>
              <p className="mt-2 text-[1.05rem] text-zinc-400">{activeCreds.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-[0.72rem] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                  User ID / Email
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a3443] bg-[#0b121b] px-3.5 py-3.5 text-zinc-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                  <Mail size={18} />
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your ID or email"
                    className="w-full bg-transparent text-base text-white placeholder:text-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[0.72rem] font-semibold tracking-[0.22em] text-zinc-400 uppercase">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-[#2a3443] bg-[#0b121b] px-3.5 py-3.5 text-zinc-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                  <Lock size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-base text-white placeholder:text-zinc-500 focus:outline-none"
                  />
                  <Eye size={18} className="text-zinc-500" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-zinc-400">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border border-[#2a3443] bg-transparent accent-[#f59e0b]" />
                  <span>Remember me</span>
                </label>

                <button type="button" className="font-medium text-zinc-400 transition-colors hover:text-white">
                  Forgot password?
                </button>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {success && <p className="text-sm text-green-400">{success}</p>}

              <button
                type="submit"
                className="flex w-full items-center justify-between rounded-xl bg-[#f97316] px-5 py-4 text-[1.15rem] font-bold tracking-[0.12em] text-white shadow-[0_10px_20px_rgba(249,115,22,0.25)]"
              >
                <span className="ml-auto mr-auto uppercase">SIGN IN</span>
                <ArrowRight size={22} />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
              <ShieldCheck size={16} className="text-[#f59e0b]" />
              <span>{activeCreds.footer}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
