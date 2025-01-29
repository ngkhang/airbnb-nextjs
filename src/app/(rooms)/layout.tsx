import FooterDefault from '@/components/common/footer-default';
import HeaderDefault from '@/components/common/header-default';

interface Props {
  children: React.ReactNode;
}

export default function RoomLayout({ children }: Props) {
  return (
    <section className='relative flex min-h-screen flex-col gap-4'>
      {/* User Header */}
      <div className='container sticky left-0 top-0 z-40 w-full bg-white shadow-lg'>
        <HeaderDefault />
      </div>

      {/* Main User Layout */}
      <main className='flex-grow'>{children}</main>

      {/* Footer section */}
      <footer className='container grid-cols-6 gap-6 self-end bg-[#F7F7F7] 4xl:grid'>
        <div className='col-span-4 col-start-2'>
          <FooterDefault />
        </div>
      </footer>
    </section>
  );
}
