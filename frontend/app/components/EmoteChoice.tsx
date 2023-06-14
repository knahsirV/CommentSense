"use client";
import { Dispatch, SetStateAction } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const EmoteChoice = ({
  emotes,
  selectedEmote,
  setSelectedEmote,
}: {
  emotes: string[];
  selectedEmote: string;
  setSelectedEmote: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Listbox value={selectedEmote} onChange={setSelectedEmote}>
      <div className="relative">
        <Listbox.Button className=" flex items-center justify-between gap-1 rounded-full bg-zinc-700 px-3 py-1">
          <span className="w-[9ch] font-bold">{selectedEmote}</span>
          <ChevronUpDownIcon className="h-5 w-5" />
        </Listbox.Button>
        <Listbox.Options className="absolute left-1 mt-1 rounded-md bg-zinc-700 p-2 shadow-md">
          {emotes.map((emote) => (
            <Listbox.Option
              key={emote}
              value={emote}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 font-semibold hover:bg-zinc-600 "
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
