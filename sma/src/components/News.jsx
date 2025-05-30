import React from 'react';
import NewsSideBar from './NewsSideBar';
import Topbar from './Topbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function News() {

  const [newsType, setNewsType] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_905c55e46bc04117a166c85dd7244a37&q=${newsType}&language=en`);
        setResult(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNews();
    console.log(newsType);
  }, [isSelected, newsType]);

  console.log(result);

  const handleSelected = () => {
    const type = event.target.innerText;
    setNewsType(type.toLowerCase());
    setIsSelected(true);
  }

  return (
    <div className='h-screen flex flex-row w-full'>
        <Topbar></Topbar>
        <div className='mt-16 w-full h-[calc(100vh-65px)] flex flex-row'>
            <NewsSideBar handleClick={handleSelected}></NewsSideBar>
            {
              isSelected ? <div className='w-3/4 h-full overflow-y-auto p-3 flex flex-col gap-2'>
                {
                  result.map((item, index) => {
                    return (
                      <div key={index} className='p-2 w-full h-full flex flex-row justify-start items-start border-b border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out'>
                        <div className='w-[25rem] h-40'>
                          <img src={item.image_url} alt="photo" className='w-full h-full object-contain' />
                        </div>
                        <div className='p-2 w-[50rem] flex flex-col justify-start items-start'>
                          <h1 className='text-lg font-semibold text-gray-800'>${item.title}<span className='text-2xl'>...</span> </h1>
                          <span className='text-xs text-gray-500 mt-2'>Source: {item.source_id}</span>
                          <div>
                            <button>
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className='text-sm font-medium mt-2'>
                                <span className='text-blue-500 hover:underline'>Read full news here</span>
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div> : <div className='p-2 h-full w-full flex justify-center items-center text-gray-400 font-semibold text-3xl'>Select a category to view news</div>
              
            }
        </div>
    </div>
  )
}

export default News;

