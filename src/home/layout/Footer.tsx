import { Container } from "@mui/material";
import { Col, Row } from "antd";
import { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa6";

function Footer() {
  useEffect(() => {
    let top_js = "1.0";
    let top_r =
      "id=48003&r=" +
      escape(document.referrer) +
      "&pg=" +
      escape(window.location.href);
    document.cookie = "smart_top=1; path=/";
    top_r += "&c=" + (document.cookie ? "Y" : "N");

    top_js = "1.1";
    top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N");

    top_js = "1.2";
    top_r +=
      "&wh=" +
      screen.width +
      "x" +
      screen.height +
      "&px=" +
      (navigator.appName.substring(0, 3) === "Mic"
        ? screen.colorDepth
        : screen.pixelDepth);

    top_js = "1.3";

    const top_rat = "&col=340F6E&t=ffffff&p=BD6F6F";
    top_r += "&js=" + top_js;

    const a = document.createElement("a");
    a.href = "http://www.uz/ru/res/visitor/index?id=48003";
    a.target = "_top";

    const img = document.createElement("img");
    img.src = "https://cnt0.www.uz/counter/collect?" + top_r + top_rat;
    img.width = 88;
    img.height = 31;
    img.alt = "Топ рейтинг www.uz";

    a.appendChild(img);

    const container = document.getElementById("uz-top-rating");
    if (container) container.appendChild(a);

    return () => {
      if (container && container.contains(a)) container.removeChild(a);
    };
  }, []);

  return (
    <div className="footer">
      <div className="footer_top">
        <Container>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12} lg={10} xl={10}>
              <div className="single_footer">
                <h2>Biz haqimizda</h2>
                <p>
                  Mazkur tizim o‘zboshimchalik bilan egallab olingan yer
                  uchastkalariga hamda ularda qurilgan binolar va inshootlarga
                  bo‘lgan huquqlarni e’tirof etish bilan bog‘liq hujjatlarni
                  vakolatli tashkilotlar bilan kelishishdan iborat
                </p>
                <ul className="social">
                  <li>
                    <a href="https://www.facebook.com/iqmath.uz/">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/iqmath2025">
                      <FaTelegramPlane />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/iq_mathuz/">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@iqmathuz">
                      <FaYoutube />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="single_footer ">
                <h2>Havolalar</h2>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <ul className="f_link">
                      <li>
                        <a href="/">
                          <FaCaretRight /> Bosh sahifa
                        </a>
                      </li>
                      <li>
                        <a href="/info">
                          <FaCaretRight /> Ma'lumotlar
                        </a>
                      </li>
                      <li>
                        <a href="/plan-grafic">
                          <FaCaretRight /> Reja jadval
                        </a>
                      </li>

                      <li>
                        <a href="open-map">
                          <FaCaretRight /> Ochiq xarita
                        </a>
                      </li>
                    </ul>
                  </Col>
                  <Col span={12}>
                    <ul className="f_link">
                      <li>
                        <a href="#documents">
                          <FaCaretRight /> Normativ hujjatlar
                        </a>
                      </li>
                      <li>
                        <a href="#contact">
                          <FaCaretRight /> Bog'lanish
                        </a>
                      </li>
                      <li>
                        <a href="/news">
                          <FaCaretRight /> Yangiliklar
                        </a>
                      </li>
                      <li>
                        <a href="#helps">
                          <FaCaretRight /> Yordam
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div className="single_footer">
                <h2>Bog'lanish</h2>
                <ul className="adress">
                  <li>
                    <a href="mailto:info@iqmath.uz">info@iqmath.uz</a>
                  </li>
                  <li>
                    <a href="#">Chilonzor tumani Cho`pon ota ko'chasi 5 uy</a>
                  </li>
                  <li>
                    <a href="tel:712070003">71 207-00-03</a>
                  </li>
                </ul>
                <div id="uz-top-rating"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="copyright">
        <Container>
          <div className="copyright_content">
            <p>
              © Mualliflik huquqi 2024 | Barcha huquqlari{" "}
              <a href="https://geoinfocom.uz/" target="_blank">
                "GEOINFOCOM DM"
              </a>{" "}
              tomonidan himoyalangan
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
