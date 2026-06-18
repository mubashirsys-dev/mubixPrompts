"use client";

import { useBuilderStore } from "@/store/builder-store";
import { CalendarDays, Plus, Trash2, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface MosqueEvent {
  title: string;
  speaker: string;
  dateTime: string;
  description: string;
}

export function EventsStep() {
  const { categoryAnswers, setCategoryAnswers } = useBuilderStore();
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  const events: MosqueEvent[] = categoryAnswers.events || [
    { title: "Weekly Tafseer Halakah", speaker: "Sheikh Yusuf Bilal", dateTime: "Every Saturday after Asr", description: "Detailed study of Quranic verses, translation, and application in contemporary settings." },
    { title: "Youth Community Gathering", speaker: "Imam Mohammed Ali", dateTime: "Every Friday at 6:30 PM", description: "Open circle conversation, sports activities, dinner, and mentorship sessions." }
  ];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !speaker.trim()) return;

    const newEvent: MosqueEvent = {
      title: title.trim(),
      speaker: speaker.trim(),
      dateTime: dateTime.trim() || "TBD",
      description: description.trim()
    };

    setCategoryAnswers({
      ...categoryAnswers,
      events: [...events, newEvent]
    });

    setTitle("");
    setSpeaker("");
    setDateTime("");
    setDescription("");
  };

  const handleDeleteEvent = (idx: number) => {
    const updatedEvents = events.filter((_, i) => i !== idx);
    setCategoryAnswers({
      ...categoryAnswers,
      events: updatedEvents
    });
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] space-y-6">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <div className="w-10 h-10 bg-[#A78BFA] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          <CalendarDays className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase text-black">Mosque Lectures & Events</h2>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-tight">Create events, classes, sermons, and community circle listings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Panel */}
        <form onSubmit={handleAddEvent} className="md:col-span-5 border-2 border-black p-4 bg-[#FFFDF5] space-y-4 shadow-[3px_3px_0px_0px_#000]">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600 stroke-[3px]" />
            Add New Event
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Event / Class Title*</label>
            <input
              type="text"
              required
              placeholder="e.g. Tafseer of Surah Al-Kahf"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Speaker / Instructor*</label>
            <input
              type="text"
              required
              placeholder="e.g. Sheikh Yusuf, Mufti Ismail"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Date & Time schedule</label>
            <input
              type="text"
              placeholder="e.g. Every Saturday after Asr (5:30 PM)"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-black">Event Description</label>
            <textarea
              placeholder="Topic highlights, study materials, or location information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-2.5 py-1.5 border-2 border-black bg-white text-xs font-bold outline-none shadow-[1.5px_1.5px_0px_0px_#000] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition-colors"
          >
            Add Event to Calendar
          </button>
        </form>

        {/* Right Events Directory Viewer Panel */}
        <div className="md:col-span-7 space-y-3">
          <h3 className="text-xs font-black uppercase text-black flex items-center gap-1.5 pl-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Active Events Calendar ({events.length})
          </h3>

          {events.length === 0 ? (
            <div className="border-2 border-dashed border-black/30 p-8 text-center bg-neutral-50 flex flex-col items-center justify-center gap-1">
              <p className="text-xs font-bold text-neutral-500 uppercase">No events added.</p>
              <p className="text-[9px] text-neutral-400">Fill in the fields on the left to populate the calendar.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {events.map((event, idx) => (
                <div key={idx} className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_0px_#000] flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-xs uppercase text-black">{event.title}</span>
                      <span className="text-[9px] font-black uppercase text-[#FF6B6B]">By {event.speaker}</span>
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.2 bg-neutral-100 border border-black/10 text-neutral-500 rounded">
                        {event.dateTime}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-[9.5px] font-bold text-neutral-500 leading-normal">{event.description}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(idx)}
                    className="p-1 border border-black hover:bg-[#FF6B6B] hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
