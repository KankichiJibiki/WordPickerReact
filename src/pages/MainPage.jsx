import React from 'react';
import FlashCard from '../components/ui/FlashCard';
import sampleWordsJson from '../sample-word.json';
import AddFlashCard from '../components/ui/AddFlashCard';
import { useState } from 'react';
import { scrollToEle } from '../Utils/ScrollUtils';
import { Element } from 'react-scroll';

const MainPage = () => {
    const [sampleWords, setSampleWord] = useState(sampleWordsJson.wordLists);

    const addSampleFlashCard = (wordList) => {
        const newSampleWords = sampleWords;
        newSampleWords.splice(0, 0, wordList);
        newSampleWords.pop();
        setSampleWord([...sampleWords], newSampleWords);
    };

    return (
        <>
            <div className="h-auto bg-teal-500 p-14">
                <div className="w-90 text-center mr-4 p-2">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-5xl">
                        理想の英単語帳
                    </h1>
                    <p className="my-4 text-xl text-white">
                        英語学習者の「欲しかった」をパッケージ化した。
                        <br />
                        そんなアプリです。
                        <br />
                        使い方はお任せします。和訳や発音確認、フラッシュカード、独り言英語としてもご使用いただけます。
                    </p>
                </div>
            </div>

            <Element name="sampleFlashCard">
                <div className="text-center my-6">
                    <h2 className="text-xl mb-1">
                        従来のフラッシュカードより単語の定着率UP
                    </h2>
                    <p className="text-sm text-gray-600">
                        正しい発音を再生もできるし、自分の発音をレコード登録もできる。ユニークなオリジナルの単語帳を作ろう！
                    </p>
                </div>
                <div className="flex justify-around flex-wrap">
                    {console.log(sampleWords)}
                    {sampleWords.map((wordList, index) => (
                        <FlashCard key={index} wordList={wordList} />
                    ))}
                </div>
            </Element>

            <h2 className="text-center my-6 p-2 text-xl">
                自由に覚えたい単語を登録してみよう。単語の意味などは自動補完してくれるから簡単！
            </h2>
            <div>
                <AddFlashCard
                    addSampleFlashCard={addSampleFlashCard}
                    scrollToElement={scrollToEle}
                />
            </div>

            {/* Quiz introduction */}

            <h2 className="text-center my-6 p-2 text-xl">
                自分が覚えたい単語の登録はもちろん180語搭載のスターターパックも使える
            </h2>

            {/* Directs to either signup or login */}
        </>
    );
};

export default MainPage;
