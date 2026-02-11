import { Container } from '@mui/material'
import { Carousel } from 'antd'

function Slider() {
  return (
    <div className="slider">
      <Carousel autoplay draggable arrows={false} infinite>
        <div className="slider_single">
          <Container>
            <div className="contnet">
              <h4>
                O'zboshimchalik bilan egallab olingan yer uchastakalari hamda ularga qurilgan bino va inshootlarga
                bo'lgan huquqlarni e'tirof etish uchun fuqaro va tadbirkorlar davlat idoralariga{' '}
                <span>murojaat qilishi talab etilmaydi</span>
              </h4>
            </div>
          </Container>
        </div>
        <div className="slider_single">
          <Container>
            <div className="contnet">
              <h4>
                Huquqlarni e'tirof etish bosqichma-bosqich xatlovdan o'tkazish yo'li <span>har yili</span> Kadastr
                agentligi tomonidan tasdiqlanadigan <span>reja-jadval</span> asosida amalga oshiriladi{' '}
              </h4>
            </div>
          </Container>
        </div>
      </Carousel>
    </div>
  )
}

export default Slider
