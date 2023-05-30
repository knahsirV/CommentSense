"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const EmoteChoice = () => {
  const emotes = [
    "Joyful",
    "Surprised",
    "Sad",
    "Angry",
    "Disgusted",
    "Fearful",
  ];
  const [selectedEmote, setSelectedEmote] = useState(emotes[0]);
  return (
    <Listbox value={selectedEmote} onChange={setSelectedEmote}>
      <div className="relative">
        <Listbox.Button className=" flex items-center justify-between gap-1 rounded-full bg-zinc-600 px-3 py-1">
          <span className="w-[9ch] font-bold">{selectedEmote}</span>
          <ChevronUpDownIcon className="h-5 w-5" />
        </Listbox.Button>
        <Listbox.Options className="absolute left-1 mt-1 rounded-md bg-zinc-600 p-2 shadow-md">
          {emotes.map((emote) => (
            <Listbox.Option
              key={emote}
              value={emote}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 font-semibold hover:bg-zinc-500 "
            >
              {({ selected }) => (
                <>
                  <CheckIcon
                    className={`h-5 w-5 ${!selected && "invisible"}`}
                  />
                  <span className="block w-full">{emote}</span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default EmoteChoice;
