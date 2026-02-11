import { Container } from '@mui/material'
import { Col, Row } from 'antd'
import { FaAngleDoubleRight, FaFileAlt, FaRegClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Stages() {
  return (
    <div className="stages section">
      <Container>
        <Row gutter={[32, 24]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} data-aos="fade-right">
            <div className="single">
              <div className="single_icon">
                <FaFileAlt />
              </div>
              <div className="content">
                <h4>1-BOSQICH</h4>
                <p>
                  Kadastr agentligining Davlat kadastrlari palatasi xodimlari tomonidan tasdiqlangan reja-grafikka
                  asosan mahallalarda xatlov ishlarini amalga oshirib Kadastr agentligining "UZKAD" ATTda ma'lumotlar
                  shakllantiriladi
                </p>
                <Link to="/" className="p_link">
                  BATAFSIL <FaAngleDoubleRight />
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} data-aos="fade-left">
            <div className="single">
              <div className="single_icon">
                <FaRegClock />
              </div>
              <div className="content">
                <h4>2-BOSQICH</h4>
                <p>
                  Xatlov ishlari yakunlangan mahallalardagi ko'chmas mulk obyektlarini "E'TIROF" AAT o'tkazish hamda
                  ko'chmas mulkka bo'lgan huquqni e'tirof etish jarayoni
                </p>
                <Link to="/" className="p_link">
                  BATAFSIL <FaAngleDoubleRight />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Stages
