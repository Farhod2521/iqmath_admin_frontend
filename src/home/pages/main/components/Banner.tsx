import { Container } from '@mui/material'
import { Col, Row } from 'antd'

function Banner() {
  return (
    <div className="banner">
      <Container>
        <Row>
          <Col xs={24} sm={24} md={20} lg={14} xl={14}>
            <div className="text">
              <h1 data-aos="fade-right">
                Huquqlarni <span>e’tirof etish</span> tizimi
              </h1>
              <p data-aos="fade-right">
                Mazkur tizim o‘zboshimchalik bilan egallab olingan yer uchastkalariga hamda ularda qurilgan binolar va
                inshootlarga bo‘lgan huquqlarni e’tirof etish bilan bog‘liq hujjatlarni vakolatli tashkilotlar bilan
                kelishishdan iborat.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Banner
