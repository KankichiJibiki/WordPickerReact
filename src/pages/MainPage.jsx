import React from 'react'
import FlashCard from '../components/FlashCard'
import sampleWords from '../sample-word.json'

const MainPage = () => {
    return (
        <>
            <div className="h-auto flex justify-center bg-teal-500 p-10">
                <div className='w-64 text-white text-center mr-4 p-2'>
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

            <h2 className='text-center mt-4 p-2 text-xl'>
                従来のフラッシュカードより単語の定着率UP
            </h2>
            <div className="flex justify-around flex-wrap ">
                { sampleWords.wordLists.map((wordList) => (
                    <FlashCard key={ wordList.id } wordList={ wordList } />
                )) }
            </div>

            <h2 className='text-center mt-4 p-2 text-xl'>
                自分が覚えたい単語の登録はもちろん180語搭載のスターターパックも使える
            </h2>
            
        </>
    )
}

export default MainPage