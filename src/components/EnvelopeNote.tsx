import React, { useState } from 'react';
import { Mail, MailOpen } from 'lucide-react';
import { EnvelopeNoteItem } from '../types/universe';

export const EnvelopeNote: React.FC<{ item: EnvelopeNoteItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#102D3A]/15 bg-[#F8F3E9] p-6 transition-colors hover:border-[#D8A45B]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full text-left flex items-start justify-between gap-4 cursor-pointer"
      >
        <div>
          <span className="font-mono-meta text-[11px] text-[#102D3A]/55 block mb-1">
            {open ? 'Opened note' : 'Sealed envelope'} · {item.date || 'Editable'}
          </span>
          <h4 className="font-hand text-2xl text-[#102D3A]">{item.promptLabel}</h4>
        </div>
        <span className="mt-1 text-[#C98F89] shrink-0">
          {open ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
        </span>
      </button>

      {open ? (
        <div className="mt-4 pt-4 border-t border-[#102D3A]/10 text-sm leading-relaxed text-[#102D3A]/85">
          <p>{item.message}</p>
        </div>
      ) : null}
    </div>
  );
};
