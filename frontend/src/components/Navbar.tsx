import { Layout } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center gap-2">
        <Layout className="text-primary-500 w-8 h-8" />
        <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          TaskGenie
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-400">
        <a href="#" className="hover:text-primary-400 transition-colors">Documents</a>
        <a href="#" className="hover:text-primary-400 transition-colors">Pricing</a>
        <button className="btn-primary py-1.5 px-4 text-xs">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
