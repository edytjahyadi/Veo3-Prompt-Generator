
import React from 'react';
import { Scene } from '../types';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { SectionHeader } from './SectionHeader';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS, SHOOTING_STYLE_OPTIONS, ART_STYLE_OPTIONS, ASPECT_RATIO_OPTIONS } from '../constants';

interface EnvironmentSectionProps {
  scene: Scene;
  onUpdate: (scene: Scene) => void;
}

export const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({ scene, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({ ...scene, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <SectionHeader title="Lingkungan & Kamera" />
      <div className="space-y-4">
        <Input
          label="Lingkungan / Lokasi"
          id="environment"
          name="environment"
          value={scene.environment}
          onChange={handleChange}
          placeholder="Contoh: Pasar malam di Jakarta, hutan hujan tropis"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Select label="Pencahayaan" id="lighting" name="lighting" value={scene.lighting} onChange={handleChange}>
            {LIGHTING_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Gaya Artistik" id="artStyle" name="artStyle" value={scene.artStyle} onChange={handleChange}>
            {ART_STYLE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Sudut Kamera" id="cameraAngle" name="cameraAngle" value={scene.cameraAngle} onChange={handleChange}>
            {CAMERA_ANGLE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Gaya Pengambilan Gambar" id="shootingStyle" name="shootingStyle" value={scene.shootingStyle} onChange={handleChange}>
            {SHOOTING_STYLE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
          <Select label="Rasio Aspek" id="aspectRatio" name="aspectRatio" value={scene.aspectRatio} onChange={handleChange}>
            {ASPECT_RATIO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </Select>
        </div>
      </div>
    </Card>
  );
};
