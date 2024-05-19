import React from 'react'
import FlashCard from '../components/FlashCard'
import sampleWords from '../sample-word.json'
import AddFlashCard from '../components/AddFlashCard'

const MainPage = () => {
    const reversedSampleWords = [...sampleWords.wordLists].reverse();

    return (
        <>
            <div className="h-auto flex justify-center bg-gray-50 p-10">
                <div className='w-64 text-center mr-4 p-2'>
                    <h1 className="text-2xl text-start mb-2">電子単語帳</h1>
                    <p className='text-start'>
                        フラッシュカードや発音の録音、発音記号の表示、登録した単語をもとに文章作成したりと...使い方は自分次第！
                        自分なりの単語帳を作ってカスタマイズしてみよう!
                    </p>
                </div>
                <div className="bg-teal-300 ml-4">
                    Image here
                </div>
            </div>

            <div className="text-center my-5">
                <h2 className='text-xl mb-1'>
                    従来のフラッシュカードより単語の定着率UP
                </h2>
                <p className="text-sm text-gray-600">正しい発音を再生もできるし、自分の発音をレコード登録もできる。ユニークなオリジナルの単語帳を作ろう！</p>
            </div>
            <div className="flex justify-around flex-wrap ">
                {console.log(reversedSampleWords)}
                { 
                    reversedSampleWords.map((wordList) => (
                        <FlashCard key={ wordList.id } wordList={ wordList } />
                    )) 
                }
            </div>

            <h2 className='text-center my-5 p-2 text-xl'>
                自由に覚えたい単語を登録してみよう。単語の意味などは自動補完してくれるから簡単！
            </h2>
            <div>
                <AddFlashCard />
            </div>
            

            <h2 className='text-center my-5 p-2 text-xl'>
                自分が覚えたい単語の登録はもちろん180語搭載のスターターパックも使える
            </h2>

            {/* Directs to either signup or login */}
            
        </>
    )
}

export default MainPage