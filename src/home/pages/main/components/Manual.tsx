import { imageSection } from '@/home/libs/section'
import { Container } from '@mui/material'
import { Col, Row } from 'antd'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ModalVideo from 'react-modal-video'
import video from '@/home/assets/video/qollanma.mp4'

function Manual() {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="manual section">
      <Container data-aos="fade-up">
        <div className="section_title">
          <h2>Foydalanish bo'yicha qo'lanma</h2>
          <div className="flex justify-center">
            <img src={imageSection} />
          </div>
        </div>
      </Container>
      <Container>
        <Row gutter={[50, 24]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} data-aos="fade-right">
            <div className="manual_left">
              <h3>E'tirozni qanday qoldiraman?</h3>
              <p>
                Jismoniy va yuridik shaxslar o‘zboshimchalik bilan egallab olingan yer uchastkasiga hamda unda qurilgan
                binolar va inshootlarga taalluqli ma’lumotlar va hujjatlar bo‘yicha e’tirozlari mavjud bo‘lgan taqdirda,
                elektron yig‘majilddagi ma’lumotlar jamoatchilikka e’lon qilingan kundan e’tiboran bir oy ichida ular
                bo‘yicha vakolatli tashkilotlarga shikoyat qilishi mumkin.
              </p>
              <p>Shikoyat qilish tartibini ko'rish uchun video qo'llanmaga o'ting.</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="manual_right">
              <div className="manual_video">
                <div className="promo_video">
                  <div className="waves_block">
                    <div className="waves wave_1"></div>
                    <div className="waves wave_2"></div>
                    <div className="waves wave_3"></div>
                  </div>
                </div>
                <button className="video" onClick={() => setOpen(true)}>
                  <FaPlay />
                </button>
                <ModalVideo
                  channel="custom"
                  url={video}
                  // youtube={{ mute: 0, autoplay: 0 }}
                  isOpen={isOpen}
                  // videoId="31Os2XQqGCw"
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Manual
