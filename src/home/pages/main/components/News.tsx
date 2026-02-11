import { imageSection } from '@/home/libs/section'
import { Container } from '@mui/material'
import { Card, Carousel, Spin } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

function News() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`https://kadastr.uz/api/v1/news?lang=uz&count=20`)
      .then((res) => {
        setData(res.data.articles)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handlLink = (item: string) => {
    window.open(item)
  }

  return (
    <div className="news section">
      <Container>
        <div className="section_title">
          <h2>Yangiliklar</h2>
          <div className="flex justify-center">
            <img src={imageSection} />
          </div>
        </div>
      </Container>
      <Container>
        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <Swiper
            autoplay
            loop
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              500: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              756: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 40
              }
            }}
          >
            {data.map((item: any, idx) => (
              <SwiperSlide key={idx} className="py-2">
                <Card
                  onClick={() => handlLink(item?.url)}
                  hoverable
                  styles={{
                    cover: { height: 150, overflow: 'hidden' },
                    body: { height: 170, padding: 14, overflow: 'hidden', textOverflow: 'ellipsis' }
                  }}
                  cover={<img alt="example" src={item.image} />}
                >
                  <div className="new_item">
                    <div className="date">{item?.published_date.slice(0, 11)}</div>
                    <p className="text">{item?.title}</p>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </div>
  )
}

export default News
