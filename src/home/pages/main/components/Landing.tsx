import React from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "Algebra",
    desc: "Asosiy tushunchalar, tenglamalar, funksiyalar va amaliy masalalar.",
  },
  {
    title: "Geometriya",
    desc: "Figuralar, teoremalar, chizmalar va vizual yondashuv bilan o‘rganish.",
  },
  {
    title: "Statistika",
    desc: "Ma’lumot tahlili, o‘rtacha qiymat, dispersiya va real misollar.",
  },
  {
    title: "Hisob",
    desc: "Hisob-kitoblar, mantiqiy yondashuv, tezkor yechim usullari.",
  },
  {
    title: "Trigonometriya",
    desc: "Burchaklar, funksiyalar va formulalar — bosqichma-bosqich.",
  },
  {
    title: "Ehtimollik",
    desc: "Test va imtihonlar uchun kerakli bazalar va mashqlar.",
  },
];

const features = [
  {
    title: "Moslashuvchan ta’lim tizimi",
    desc: "O‘qish tezligi va chuqurligini o‘zingiz tanlaysiz — kimdir tez, kimdir puxta.",
  },
  {
    title: "Video darsliklar",
    desc: "Murakkab mavzularni ham oson o‘zlashtirish uchun bosqichma-bosqich video tushuntirishlar.",
  },
  {
    title: "Amaliy vazifalar",
    desc: "Nazariya + amaliyot: o‘rganganingizni darhol mustahkamlaysiz.",
  },
  {
    title: "Test va mashqlar",
    desc: "Bilimingizni sinab ko‘rasiz, imtihon va testlarga aniq tayyorgarlik ko‘rasiz.",
  },
  {
    title: "Baholash va progress",
    desc: "O‘sish dinamikasini kuzatib borasiz va motivatsiya yo‘qolmaydi.",
  },
  {
    title: "Mantiqiy fikrlash rivoji",
    desc: "Nafaqat matematika, balki hayotdagi muammolarni hal qilish ko‘nikmalari ham oshadi.",
  },
];

export default function Landing() {
  return (
    <main className="bg-white dark:bg-[#0b1220] text-[#0f172a] dark:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-fuchsia-600/10 to-cyan-500/10" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-56 right-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Innovatsion matematika platformasi
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                IQmath — matematikani samarali o‘rganish uchun elektron
                platforma
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                IQmath ilg‘or o‘qitish usullari va zamonaviy texnologiyalarni
                birlashtirib, turli yosh va darajadagi foydalanuvchilar uchun
                moslashuvchan ta’lim maydonini yaratadi.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Boshlash (Login)
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:text-white/90 dark:hover:bg-white/5"
                >
                  Batafsil ma’lumot
                </a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat label="Kurslar" value="6+" />
                <Stat label="Video dars" value="100+" />
                <Stat label="Mashqlar" value="1000+" />
              </div>
            </div>

            {/* Hero Card */}
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <h3 className="text-lg font-bold">Platforma nimani beradi?</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex gap-3">
                  <Check />
                  <span>Nazariya + amaliyot orqali mustahkamlash</span>
                </li>
                <li className="flex gap-3">
                  <Check />
                  <span>Video tushuntirishlar bilan oson o‘zlashtirish</span>
                </li>
                <li className="flex gap-3">
                  <Check />
                  <span>Test va baholash orqali progress nazorati</span>
                </li>
                <li className="flex gap-3">
                  <Check />
                  <span>Mantiqiy va analitik fikrlashni rivojlantirish</span>
                </li>
              </ul>

              <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                  IQmath platformasida o‘qish natijasida nafaqat akademik
                  ko‘rsatkichlar yaxshilanadi, balki mantiqiy va analitik
                  fikrlash ko‘nikmalari ham rivojlanadi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              IQmath haqida
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
              IQmath — matematikani samarali o‘qitish uchun maxsus ishlab
              chiqilgan innovatsion elektron platforma. U turli yosh guruhlari
              va tayyorgarlik darajasidagi foydalanuvchilar uchun o‘ziga xos
              ta’lim maydonini yaratadi.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
              Har bir kurs nafaqat nazariy materiallarni, balki o‘rganilgan
              narsalarni mustahkamlashga yordam beradigan amaliy vazifalarni ham
              o‘z ichiga oladi. Moslashuvchan tizim o‘quvchiga o‘qish tezligini
              mustaqil tanlash imkonini beradi.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-bold">Nega aynan IQmath?</h3>
            <div className="mt-4 grid gap-3">
              {features.slice(0, 3).map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl bg-slate-50 p-4 dark:bg-white/5"
                >
                  <div className="font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Kurslar</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Algebra, geometriya, statistika, hisob va boshqa muhim
              yo‘nalishlar.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-lg font-bold">{c.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {c.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Ko‘rish <Arrow />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO + TESTS */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-bold">Video darsliklar</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Nazariy tushunchalar bosqichma-bosqich tushuntiriladi. Aniq
              misollar yechimlari ham video ko‘rinishda bo‘ladi — foydalanuvchi
              nafaqat “qanday”, balki “nega” shunday yechilishini ham tushunadi.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <div className="text-sm font-semibold">Tavsiyalar:</div>
              <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex gap-2">
                  <Dot /> Videoni ko‘rib, keyin mashq bajaring
                </li>
                <li className="flex gap-2">
                  <Dot /> Har bo‘limdan so‘ng mini-test ishlang
                </li>
                <li className="flex gap-2">
                  <Dot /> Qiyin joylarni qayta ko‘rib chiqing
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-bold">Test, mashqlar va baholash</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Bilimingizni sinab ko‘rasiz, imtihon/testlarga tayyorlanasiz.
              Baholash tizimi o‘sishni ko‘rsatadi, moslashuvchan topshiriqlar
              esa motivatsiyani yo‘qotmasdan oldinga olib chiqadi.
            </p>

            <div className="mt-6 space-y-4">
              <ProgressRow label="Amaliy mashqlar" value={82} />
              <ProgressRow label="Test natijalari" value={67} />
              <ProgressRow label="Video darslar" value={74} />
            </div>

            <div className="mt-6 rounded-xl bg-indigo-600/10 p-4 text-sm text-slate-700 dark:text-slate-200">
              Natijada: akademik ko‘rsatkichlar + mantiqiy/analitik fikrlash
              rivojlanadi.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-extrabold md:text-3xl">
                Bugun boshlang — natijani tez ko‘ring
              </h3>
              <p className="mt-3 text-white/90 leading-7">
                IQmath bilan o‘qish natijasida nafaqat matematik bilimlar, balki
                muammo yechish ko‘nikmalari ham kuchayadi.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-white/95"
              >
                Kirish (Login)
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Batafsil
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="text-lg font-extrabold">{value}</div>
      <div className="text-xs text-slate-600 dark:text-slate-300">{label}</div>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-slate-500 dark:text-slate-300">{value}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-white/10">
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
      ✓
    </span>
  );
}

function Arrow() {
  return <span aria-hidden>→</span>;
}

function Dot() {
  return (
    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
  );
}
