"use client";

import { useEffect, useState } from "react";

type TextEmojiType = {
  text: string;
  emoji: string;
};

type MessagePropsType = {
  checkTop: () => void;
  selectedMsg: string;
  textEmoji: TextEmojiType[];
  setSelectedMsg: React.Dispatch<React.SetStateAction<string>>;
  setTextEmoji: React.Dispatch<React.SetStateAction<TextEmojiType[]>>;
  text: string;
};

function Sender({
  checkTop,
  selectedMsg,
  textEmoji,
  setSelectedMsg,
  setTextEmoji,
  text,
}: MessagePropsType) {
  function addEmoji(e: React.MouseEvent<HTMLDivElement>, param: string) {
    e.stopPropagation();
    // does message have a reaction already
    const isMessageReacted =
      textEmoji.filter((reaction) => reaction.text === text).length >= 1;
    let newEmojis: TextEmojiType[];

    if (param === " ") {
      newEmojis = [...textEmoji.filter((reaction) => reaction.text !== text)];
      setTextEmoji(newEmojis);
      setSelectedMsg("");
      return;
    }

    if (isMessageReacted) {
      newEmojis = [
        ...textEmoji.filter((reaction) => reaction.text !== text),
        { text: text, emoji: param },
      ];
    } else {
      newEmojis = [...textEmoji, { text: text, emoji: param }];
    }
    localStorage.setItem("emojis", JSON.stringify(newEmojis));
    setTextEmoji(newEmojis);
    setSelectedMsg("");
  }

  return (
    <button
      onClick={() => {
        setSelectedMsg(text);
        checkTop();
      }}
      id={text}
      className={`${
        selectedMsg === text && "relative z-30"
      } flex w-full items-center justify-end py-1 pr-2`}
    >
      {selectedMsg === text && (
        <div className="absolute right-0 size-full bg-lime-300 bg-opacity-40 flex items-end">
          <div className="absolute z-10 -top-9 right-2 bg-white p-2 rounded-full inline-flex gap-2 emojiContainer">
            {["👍", "💖", " 😂", " 😲", " 😥", "🙏", " "].map((emoji) => (
              <div
                role="button"
                key={emoji}
                onClick={(e) => addEmoji(e, emoji)}
                className={`${
                  emoji === " " && "border border-dashed border-red-400"
                } size-7 flex items-center justify-center rounded-full hover:bg-slate-300 emoji`}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className={`${
          textEmoji.filter((reacts) => reacts.text === text).length >= 1 &&
          "mb-4"
        } relative max-w-[80%] bg-lime-400 bg-opacity-70 p-2 text-sm rounded-md font-normal`}
      >
         {textEmoji.filter((reacts) => reacts.text === text).length >= 1 && (
          <div className="absolute top-[95%] right-2 size-5 bg-white rounded-full flex items-center justify-center emoji">
            {textEmoji.filter((reacts) => reacts.text === text)[0].emoji}
          </div>
        )}
        {text}
       
      </div>
    </button>
  );
}

function Receiver({
  checkTop,
  selectedMsg,
  textEmoji,
  setSelectedMsg,
  setTextEmoji,
  text,
}: MessagePropsType) {
  function addEmoji(e: React.MouseEvent<HTMLDivElement>, param: string) {
    e.stopPropagation();
    // does message have a reaction already
    const isMessageReacted =
      textEmoji.filter((reaction) => reaction.text === text).length >= 1;
    let newEmojis: TextEmojiType[];

    if (param === " ") {
      newEmojis = [...textEmoji.filter((reaction) => reaction.text !== text)];
      setTextEmoji(newEmojis);
      setSelectedMsg("");
      return;
    }

    if (isMessageReacted) {
      newEmojis = [
        ...textEmoji.filter((reaction) => reaction.text !== text),
        { text: text, emoji: param },
      ];
    } else {
      newEmojis = [...textEmoji, { text: text, emoji: param }];
    }
    localStorage.setItem("emojis", JSON.stringify(newEmojis));
    setTextEmoji(newEmojis);
    setSelectedMsg("");
  }

  return (
    <button
      onClick={() => {
        setSelectedMsg(text);
        checkTop();
      }}
      id={text}
      className={`${
        selectedMsg === text && "relative z-30"
      } flex w-full items-center py-1 pl-2 outline-none`}
    >
      {selectedMsg === text && (
        <div className="absolute left-0 size-full bg-lime-300 bg-opacity-40 flex items-start">
          <div className="relative -top-9 left-5 bg-white p-2 rounded-full inline-flex gap-2 emojiContainer">
            {["👍", "💖", " 😂", " 😲", " 😥", "🙏", " "].map((emoji) => (
              <div
                role="button"
                key={emoji}
                onClick={(e) => addEmoji(e, emoji)}
                className={`${
                  emoji === " " && "border border-dashed border-red-400"
                } size-7 flex items-center justify-center rounded-full hover:bg-slate-300 emoji`}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={`${
          textEmoji.filter((reacts) => reacts.text === text).length >= 1 &&
          "mb-4"}
         relative max-w-[80%] bg-slate-100 bg-opacity-70 p-2 text-sm rounded-md font-normal`}>
        {textEmoji.filter((reacts) => reacts.text === text).length >= 1 && (
          <div className="absolute top-[95%] size-5 bg-white rounded-full flex items-center justify-center emoji">
            {textEmoji.filter((reacts) => reacts.text === text)[0].emoji}
          </div>
        )}
        {text}
      </div>
    </button>
  );
}

export default function Home() {
  const [selectedMsg, setSelectedMsg] = useState("");
  const [textEmoji, setTextEmoji] = useState([
    {
      text: "Ola",
      emoji: "😋",
    },
  ]);

  // useEffect to load reacted messages (if any) from localstorage
  useEffect(() => {
    const emojis = localStorage.getItem("emojis");
    if (emojis) {
      const parsedEmojis: TextEmojiType[] = JSON.parse(emojis);
      setTextEmoji(parsedEmojis);
    }
  }, []);

  function checkTop() {
    setTimeout(() => {
      const emojiContainers = document.querySelectorAll(".emojiContainer");
      emojiContainers.forEach((container) => {
        const emojiContainerTop = container?.getBoundingClientRect().top;
        if (emojiContainerTop !== undefined && emojiContainerTop < 0) {
          container.style.top = "40px"; // Use container instead of emojiContainer
        }
      });
    }, 500);
  }

  return (
    <main className="relative h-vh w-full bg-red-400 max-w-[512px] mx-auto">
      <div className="relative h-full bg-stone-300 overflow-scroll">
        {/* Blur cover */}
        {selectedMsg !== "" && (
          <div
            onClick={() => setSelectedMsg("")}
            className="fixed z-10 top-0 left-0 size-full bg-black bg-opacity-30 backdrop-blur-sm fadeIn"
          ></div>
        )}

        {[
          { sender: "Hey, are you free to talk?" },
          { sender: "I have something interesting to share!" },
          { receiver: "Oh, really? What's going on?" },
          { sender: "You won't believe it. I got promoted at work today!" },
          { receiver: "Wow, congratulations! That's amazing news!" },
          { sender: "Thanks! I've been waiting for this for months." },
          { sender: "Feels like a big weight off my shoulders." },
          { receiver: "I can imagine! How are you going to celebrate?" },
          { sender: "Not sure yet. Maybe dinner with some friends." },
          { sender: "You should join us!" },
          { receiver: "I'd love to! Just let me know when and where." },
          { sender: "Will do. Thinking of this new place downtown." },
          { sender: "Heard they have great food." },
          { receiver: "Sounds perfect! I've been meaning to try it out." },
          { sender: "Great! I'll text you the details later." },
          { receiver: "Awesome! I'm excited!" },
          { sender: "Me too! It's going to be fun." },
          { receiver: "By the way, any new projects at work?" },
          { sender: "Yeah, I've got a big one coming up." },
          { sender: "But I feel more confident now with the promotion." },
          { receiver: "That's the spirit! You'll do great." },
        ].map((chat) => {
          if (chat.sender) {
            return (
              <Sender
                key={chat.sender}
                checkTop={checkTop}
                selectedMsg={selectedMsg}
                textEmoji={textEmoji}
                setSelectedMsg={setSelectedMsg}
                setTextEmoji={setTextEmoji}
                text={chat.sender}
              />
            );
          } else {
            return (
              <Receiver
                key={chat.receiver}
                checkTop={checkTop}
                selectedMsg={selectedMsg}
                textEmoji={textEmoji}
                setSelectedMsg={setSelectedMsg}
                setTextEmoji={setTextEmoji}
                text={chat.receiver as string}
              />
            );
          }
        })}
      </div>
      {/* <div className="h-10 relative top-[calc(100%_-_2.5rem)] border bg-white">
        <textarea placeholder="Ola" className="text-black w-full h-full" />
      </div> */}
    </main>
  );
}
