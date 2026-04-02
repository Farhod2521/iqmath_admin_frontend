import { lazy } from "react";
import { Route } from "react-router-dom";

const Announcements = lazy(() => import("./announcement/pages/Announcements"));
const Motivations = lazy(() => import("./motivation/pages/Motivation"));
const ConversionRates = lazy(
  () => import("./conversion/pages/ConversionRates"),
);
const DailyCoins = lazy(() => import("./daily-coin/pages/DailyCoins"));
const Category = lazy(() => import("./category/pages/Category"));
const Products = lazy(() => import("./product/pages/Products"));
const Mathematicians = lazy(
  () => import("./matematician/pages/Mathematicians"),
);

const ReferralCouponSettings = lazy(
  () => import("./referal-coupon/pages/ReferralCouponSettings"),
);

const Banner = lazy(() => import("./banner/pages/Banner"));
const Tags = lazy(() => import("./tag/pages/Tags"));
const Faqs = lazy(() => import("./faq/pages/Faqs"));
const UploadFilesList = lazy(
  () => import("./upload-file/pages/UploadFilesList"),
);






const SettingsRoutes = (
  <Route path="/settings">
    <Route path="annoucements" element={<Announcements />} />
    <Route path="motivation" element={<Motivations />} />
    <Route path="conversion" element={<ConversionRates />} />
    <Route path="daily-coin" element={<DailyCoins />} />
    <Route path="category" element={<Category />} />
    <Route path="products" element={<Products />} />
    <Route path="mathematicians" element={<Mathematicians />} />
    <Route path="banner" element={<Banner />} />
    <Route path="management-tags" element={<Tags />} />
    <Route path="management-faqs" element={<Faqs />} />

    <Route
      path="referral-coupon-settings"
      element={<ReferralCouponSettings />}
    />
    <Route path="upload-file-settings" element={<UploadFilesList />} />
  </Route>
);

export default SettingsRoutes;
