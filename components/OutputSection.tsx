
import React from 'react';
import { GeneratedPrompts } from '../types';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface OutputSectionProps {
  prompts: GeneratedPrompts;
}

const ClipboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const PromptDisplay: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [copyStatus, copy] = useCopyToClipboard();

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-slate-100">{title}</h3>
        <Button variant="secondary" onClick={() => copy(content)} className="text-xs !py-1 !px-2">
          {copyStatus === 'copied' ? <CheckIcon/> : <ClipboardIcon/>}
          <span className="ml-2">{copyStatus === 'copied' ? 'Disalin!' : 'Salin'}</span>
        </Button>
      </div>
      <pre className="bg-slate-900/70 p-4 rounded-md text-sm text-slate-300 whitespace-pre-wrap break-words max-h-96 overflow-y-auto font-mono">
        {content}
      </pre>
    </div>
  );
};


export const OutputSection: React.FC<OutputSectionProps> = ({ prompts }) => {
  return (
    <Card className="h-full">
      <div className="space-y-6">
        <PromptDisplay title="Prompt Bahasa Indonesia" content={prompts.indonesian} />
        <PromptDisplay title="Prompt Bahasa Inggris" content={prompts.english} />
        <PromptDisplay title="JSON Prompt" content={prompts.json} />
      </div>
    </Card>
  );
};
