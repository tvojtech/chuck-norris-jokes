import { Logo } from '@/components/logo';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <div className="flex flex-row items-center gap-2">
          <Logo />
          <h1 className="text-xl">Chuck Norris jokes</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
