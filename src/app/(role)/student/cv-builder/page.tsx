// pages/create-cv.tsx
'use client';

import React, { useState } from 'react';
import { useGetAllSkillsQuery } from '@/services/skillsApi';
import { useGetAllIndustriesQuery } from '@/services/industriesApi';
import { useGetAllJobTypesQuery } from '@/services/jobTypesApi';
import { Skill } from '@/types/skill';
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import {TrashIcon} from "@heroicons/react/24/outline";

interface Experience {
  id: number;
  title: string;
  company: string;
  startYear: string;
  endYear: string;
  description: string;
}

interface CVData {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  biography: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  code: string;
  industryId: number;
  industry: string;
  school: string;
  jobId: number;
  jobTitle: string;
  skills: Skill[];
  experiences: Experience[];
}

export default function CreateCvPage() {
  const { data: industries, isLoading: isLoadingIndustries } = useGetAllIndustriesQuery(null);
  const { data: skillsList, isLoading: isLoadingSkills } = useGetAllSkillsQuery(null);
  const { data: jobtypesList, isLoading: isLoadingJobTypes } = useGetAllJobTypesQuery(null);

  const [cv, setCv] = useState<CVData>({
    id: 1,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/uphub%2Fimages%2Fplaceholders%2Ffemale-user.jpg?alt=media',
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    biography: '',
    dateOfBirth: '',
    gender: 'Female',
    code: '',
    industryId: 0,
    industry: '',
    school: '',
    jobId: 0,
    jobTitle: '',
    skills: [],
    experiences: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCv(c => ({ ...c, [name]: value }));
  };

  const toggleSkill = (s: Skill) =>
      setCv(c => ({
        ...c,
        skills: c.skills.some(x => x.id === s.id)
            ? c.skills.filter(x => x.id !== s.id)
            : [...c.skills, s],
      }));

  const addExperience = () =>
      setCv(c => ({
        ...c,
        experiences: [
          ...c.experiences,
          { id: Date.now(), title: '', company: '', startYear: '', endYear: '', description: '' },
        ],
      }));

  const handleDownloadPdf = async () => {
    const el  = document.getElementById('id-cv-preview');
    const btn = document.getElementById('id-download-btn');
    if (!el) return;

    // 1) hide the button
    if (btn) btn.style.display = 'none';

    // 2) expand container to full height
    const prevOverflow = el.style.overflow;
    const prevHeight   = el.style.height;
    el.style.overflow = 'visible';
    el.style.height   = `${el.scrollHeight}px`;

    // 3) snapshot with html2canvas-pro at high resolution
    const canvas = await html2canvas(el, {
      scale: 3,                  // 2× device pixel ratio
      useCORS: true,             // allow external images
      allowTaint: false,         // no tainted canvases
      backgroundColor: '#ffffff',// ensure white background
      imageTimeout: 15000,       // give it time to load
      logging: false
    });
    const imgData = canvas.toDataURL('image/png');

    // 4) restore layout & show button
    el.style.overflow = prevOverflow;
    el.style.height   = prevHeight;
    if (btn) btn.style.display = '';

    // 5) build a multi-page A4 PDF
    const pdf  = new jsPDF('p','mm','a4');
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    // full-image scaled height
    const imgPdfH = (canvas.height * pdfW) / canvas.width;
    let position = 0;

    // first page
    pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgPdfH, undefined, 'SLOW');
    let remaining = imgPdfH - pdfH;

    // subsequent pages
    while (remaining > 0) {
      position -= pdfH;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgPdfH, undefined, 'SLOW');
      remaining -= pdfH;
    }

    // 6) save
    pdf.save(`${cv.firstName || 'My'}_${cv.lastName || 'CV'}.pdf`);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setCv(c => ({ ...c, imageUrl: previewUrl }));
    }
  };

  const handleExperienceChange = (i: number, field: keyof Omit<Experience, 'id'>, v: string) => {
    setCv(c => {
      const exps = [...c.experiences];
      // @ts-ignore
      exps[i] = { ...exps[i], [field]: v };
      return { ...c, experiences: exps };
    });
  };

  const removeExperience = (i: number) =>
      setCv(c => ({
        ...c,
        experiences: c.experiences.filter((_, idx) => idx !== i),
      }));

  return (
      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[color:var(--color-custom-white)] p-6">

        {/* Left: Form */}
        <main className="flex-1 bg-[color:var(--color-custom-white)] p-6 shadow-2xl overflow-auto space-y-6">
          <h1 className="text-2xl font-bold text-[color:var(--color-custom-black)]">Tạo CV của bạn</h1>
          <form className="space-y-4">

            {/* Avatar Upload (styled) */}
            <div className="flex items-center space-x-6 justify-center">
              <div className="relative w-48 h-48">
                {/* current avatar on top */}
                <img
                    src={cv.imageUrl}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover border-2 border-[color:var(--color-custom-blue-2)]"
                />

                {/* overlay button */}
                <label className="absolute inset-0
                                bg-black bg-opacity-40
                                opacity-0 hover:opacity-100
                                flex items-center justify-center
                                rounded-full
                                cursor-pointer
                                transition-opacity"
                >
                  <span className="text-white text-sm">Đổi ảnh</span>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Họ</label>
              <input
                  name="firstName"
                  value={cv.firstName}
                  onChange={handleChange}
                  maxLength={50}
                  minLength={10}
                  className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Tên</label>
              <input
                  name="lastName"
                  value={cv.lastName}
                  onChange={handleChange}
                  maxLength={50}
                  minLength={10}
                  className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Email</label>
              <input
                  name="userName"
                  type="email"
                  value={cv.userName}
                  onChange={handleChange}
                  maxLength={50}
                  minLength={10}
                  className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
              />
            </div>

            {/* Phone & DOB */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-[color:var(--color-custom-gray)]">Điện thoại</label>
                <input
                    name="phoneNumber"
                    value={cv.phoneNumber}
                    type={"tel"}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
                />
              </div>
              <div>
                <label className="block mb-1 text-[color:var(--color-custom-gray)]">Ngày sinh</label>
                <input
                    name="dateOfBirth"
                    type="date"
                    value={cv.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
                />
              </div>
            </div>

            {/* Biography */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Giới thiệu</label>
              <textarea
                  name="biography"
                  rows={4}
                  maxLength={500}
                  value={cv.biography}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)] resize-none"
              />
            </div>

            {/* Student Code */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Mã sinh viên</label>
              <input
                  name="code"
                  maxLength={20}
                  minLength={10}
                  value={cv.code}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
              />
            </div>

            {/* School */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Trường</label>
              <input
                  name="school"
                  maxLength={50}
                  minLength={10}
                  value={cv.school}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Ngành</label>
              {isLoadingIndustries ? (
                  <div className="text-[color:var(--color-custom-gray)]">Đang tải…</div>
              ) : (
                  <select
                      name="industryId"
                      value={cv.industryId}
                      onChange={e => {
                        const id = Number(e.target.value);
                        const ind = industries.data.find(i => i.id === id);
                        setCv(c => ({ ...c, industryId: id, industry: ind?.name ?? '' }));
                      }}
                      className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
                  >
                    <option value={0}>— Chọn ngành —</option>
                    {industries.data.map(i => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                  </select>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Chức danh</label>
              {isLoadingJobTypes ? (
                  <div className="text-[color:var(--color-custom-gray)]">Đang tải…</div>
              ) : (
                  <select
                      name="jobId"
                      value={cv.jobId}
                      onChange={e => {
                        const id = Number(e.target.value);
                        const jt = jobtypesList.data.find(j => j.id === id);
                        setCv(c => ({ ...c, jobId: id, jobTitle: jt?.name ?? '' }));
                      }}
                      className="w-full border rounded px-3 py-2 focus:ring-3 focus:ring-[color:var(--color-custom-blue-2)]"
                  >
                    <option value={0}>— Chọn chức danh —</option>
                    {jobtypesList.data.map(j => (
                        <option key={j.id} value={j.id}>{j.name}</option>
                    ))}
                  </select>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block mb-1 text-[color:var(--color-custom-gray)]">Kỹ năng</label>
              {isLoadingSkills ? (
                  <div className="text-[color:var(--color-custom-gray)]">Đang tải…</div>
              ) : (
                  <div className="flex flex-wrap gap-2">
                    {skillsList.data.map(s => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleSkill(s)}
                            className={`px-3 py-1 rounded-full border ${
                                cv.skills.some(x => x.id === s.id)
                                    ? 'bg-[color:var(--color-custom-yellow-3)] border-transparent'
                                    : 'border-[color:var(--color-custom-gray)]'
                            }`}
                        >
                          {s.name}
                        </button>
                    ))}
                  </div>
              )}
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-lg font-semibold text-[color:var(--color-custom-black)]">Kinh nghiệm</h2>
              {cv.experiences.map((exp, i) => (
                  <div key={exp.id} className="border rounded p-4 mb-4 bg-[color:var(--color-custom-yellow-1)]">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-[color:var(--color-custom-black)]">Mục #{i + 1}</span>
                      <button
                          type="button"
                          onClick={() => removeExperience(i)}
                          className="flex items-center text-[color:var(--color-custom-red-bg)] hover:underline text-sm"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        Xóa
                      </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Chức danh"
                        value={exp.title}
                        maxLength={100}
                        minLength={10}
                        onChange={e => handleExperienceChange(i, 'title', e.target.value)}
                        className="w-full mb-2 border rounded px-2 py-1"
                    />
                    <input
                        type="text"
                        placeholder="Công ty"
                        value={exp.company}
                        maxLength={100}
                        minLength={10}
                        onChange={e => handleExperienceChange(i, 'company', e.target.value)}
                        className="w-full mb-2 border rounded px-2 py-1"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                          type="date"
                          placeholder="Năm bắt đầu"
                          value={exp.startYear}
                          onChange={e => handleExperienceChange(i, 'startYear', e.target.value)}
                          className="border rounded px-2 py-1"
                      />
                      <input
                          type="date"
                          placeholder="Năm kết thúc hoặc Hiện tại"
                          value={exp.endYear}
                          onChange={e => handleExperienceChange(i, 'endYear', e.target.value)}
                          className="border rounded px-2 py-1"
                      />
                    </div>
                    <textarea
                        placeholder="Mô tả"
                        value={exp.description}
                        onChange={e => handleExperienceChange(i, 'description', e.target.value)}
                        rows={3}
                        maxLength={300}
                        className="w-full border rounded px-2 py-1 resize-none"
                    />
                  </div>
              ))}
              <button type="button" onClick={addExperience} className="text-[color:var(--color-custom-blue-2)] hover:underline">
                + Thêm kinh nghiệm
              </button>
            </div>
          </form>
        </main>

        {/* Right: CV Preview */}
        <aside
            id="id-cv-preview"
            className="relative flex-1 bg-[color:var(--color-custom-white)] p-8 shadow-2xl rounded-lg mt-6 lg:mt-0 lg:ml-8 overflow-auto">

          {/* put the button here */}
          <button
              id="id-download-btn"
              onClick={handleDownloadPdf}
              className="absolute top-4 right-4 bg-custom-blue-2 text-custom-white
                         px-4 py-2 rounded shadow hover:opacity-90 transition"
          >
            Tải xuống PDF
          </button>

          {/* Header */}
          <div className="text-center mb-6">

            <div className="relative mb-2 h-32 w-32 overflow-hidden rounded-full bg-custom-gray inline-block">
              <Image
                  src={cv.imageUrl}
                  alt={`${name} Logo`}
                  fill={true}
                  objectFit={"cover"}
                  quality={100}
                  priority={false}
                  loading={"lazy"}
                  placeholder={"blur"}
                  blurDataURL={"/images/placeholderImage.png"}
              />
            </div>

            <h1 className="text-3xl font-bold text-[color:var(--color-custom-black)]">
              {cv.firstName || 'Họ'} {cv.lastName || 'Tên'}
            </h1>

            <p className="text-[color:var(--color-custom-blue-3)] mt-1">{cv.jobTitle || 'Chức danh'}</p>
            <p className="text-[color:var(--color-custom-gray)]">{cv.industry || 'Ngành'}</p>
            <div className="mt-2 text-sm space-y-1 text-[color:var(--color-custom-gray)]">
              <div>{cv.userName || 'email@example.com'}</div>
              <div>{cv.phoneNumber || '0123-456-789'}</div>
            </div>
          </div>

          <hr className="border-t border-[color:var(--color-custom-gray)] py-4" />

          {/* Summary */}
          <section className="mb-6">
            <h2 className="inline-block bg-[color:var(--color-custom-blue-1)] text-[color:var(--color-custom-blue-3)] px-3 py-1 rounded-full uppercase text-sm mb-3">
              Giới Thiệu
            </h2>
            <p className="text-[color:var(--color-custom-black)] whitespace-pre-line leading-relaxed px-2 py-8">
              {cv.biography || 'Một đoạn tóm tắt về bạn...'}
            </p>
          </section>

          <hr className="border-t border-[color:var(--color-custom-gray)] py-4" />

          {/* Experience */}
          {cv.experiences.length > 0 && (
              <section className="mb-6">
                <h2 className="inline-block bg-[color:var(--color-custom-blue-1)] text-[color:var(--color-custom-blue-3)] px-3 py-1 rounded-full uppercase text-sm mb-4">
                  Kinh nghiệm
                </h2>
                {cv.experiences.map(exp => (
                    <div key={exp.id} className="px-2 py-8">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg basis-2/3 font-medium text-[color:var(--color-custom-black)]">{exp.title}</h3>
                        <span className="text-sm basis-1/3 text-end text-[color:var(--color-custom-gray)]">
                          {exp.startYear} – {exp.endYear}
                        </span>
                      </div>
                      <div className="text-sm italic text-[color:var(--color-custom-gray)] mb-2">
                        {exp.company}
                      </div>
                      <p className="text-[color:var(--color-custom-black)] text-sm whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                ))}
              </section>
          )}

          <hr className="border-t border-[color:var(--color-custom-gray)] py-4" />

          {/* Education */}
          <section className="mb-6">
            <h2 className="inline-block bg-[color:var(--color-custom-blue-1)] text-[color:var(--color-custom-blue-3)] px-3 py-1 rounded-full uppercase text-sm mb-3">
              Học vấn
            </h2>
            <div className="grid grid-cols-2 gap-x-4 text-[color:var(--color-custom-black)] px-2 py-8">
              <div className="font-medium">Trường:</div>
              <div>{cv.school || 'Tên trường'}</div>
              <div className="font-medium">Mã sinh viên:</div>
              <div>{cv.code || 'SEXXXXX'}</div>
              <div className="font-medium">Ngày sinh:</div>
              <div>{cv.dateOfBirth || '--/--/----'}</div>
              <div className="font-medium">Giới tính:</div>
              <div>{cv.gender}</div>
            </div>
          </section>

          <hr className="border-t border-[color:var(--color-custom-gray)] py-4" />

          {/* SKills */}
          {cv.skills.length > 0 && (
              <section className="mb-6">
                <h2
                    className="inline-block bg-[color:var(--color-custom-blue-1)]
                             text-[color:var(--color-custom-blue-3)]
                               px-3 py-1 rounded-full uppercase text-sm mb-3"
                >
                  Kỹ năng
                </h2>

                <ul className="list-none list-inside
                   grid grid-cols-2 gap-x-6 gap-y-2
                   px-2 py-8
                   text-[color:var(--color-custom-black)] text-sm">
                  {cv.skills.map(s => (
                      <li key={s.id}>
                        {s.name}
                      </li>
                  ))}
                </ul>
              </section>
          )}

          <hr className="border-t border-[color:var(--color-custom-gray)] py-4" />
        </aside>
      </div>
  );
}
