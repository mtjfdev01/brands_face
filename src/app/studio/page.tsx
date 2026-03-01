import type { Metadata } from 'next';
import Configurator from '@/components/Configurator';

export const metadata: Metadata = {
  title: 'Studio | Brands Face – 3D Box Configurator',
  description:
    'Design custom packaging boxes in 3D. Choose box types, dimensions, materials, and upload artwork for real-time preview.',
};

export default function StudioPage() {
  return <Configurator />;
}
