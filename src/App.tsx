import '@/styles/global.css';
import { SolarSystemRadial } from '@/components/SolarSystemRadial';

function App() {
  return (
    <div
      className="bg-gray-99 flex h-screen w-full items-center justify-center"
      style={{
        backgroundImage: 'url("/images/background/backgroundImage.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SolarSystemRadial />
    </div>
  );
}

export default App;
