
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начало наполнения базы данных...');

  await prisma.fAQ.deleteMany();
  await prisma.article.deleteMany();
  await prisma.video.deleteMany();
  await prisma.course.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Создание тестовых пользователей
  const testPassword = await bcrypt.hash('test123456', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);
  const surgeonPassword = await bcrypt.hash('surgeon123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // Тестовый пользователь для автоматических тестов
  await prisma.user.create({
    data: {
      email: 'test@ssvnauka.com',
      password: testPassword,
      name: 'Test User',
      role: "STUDENT",
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@ssvnauka.com',
      password: adminPassword,
      name: 'Администратор Системы',
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: 'surgeon@hospital.com',
      password: surgeonPassword,
      name: 'Хирург-практик',
      role: "SURGEON",
    },
  });

  await prisma.user.create({
    data: {
      email: 'student@meduni.com',
      password: studentPassword,
      name: 'Студент-медик',
      role: "STUDENT",
    },
  });

  console.log('✅ Пользователи созданы');

  // Создание курсов (15 курсов)
  const coursesData = [
    // БАЗОВЫЕ КУРСЫ (5 курсов)
    {
      title: 'Основы абдоминальной хирургии',
      description: 'Вводный курс для студентов медицинских вузов, охватывающий базовые принципы абдоминальной хирургии, анатомию брюшной полости, подготовку к операциям и послеоперационный уход. Включает теоретические лекции и демонстрации базовых хирургических техник.',
      level: "BASIC",
      durationHours: 40,
      imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    },
    {
      title: 'Хирургическая анатомия желудочно-кишечного тракта',
      description: 'Детальное изучение анатомии ЖКТ с акцентом на хирургические аспекты. Курс включает изучение топографии органов, кровоснабжения, иннервации и лимфодренажа. Подходит для студентов 4-5 курсов и интернов.',
      level: "BASIC",
      durationHours: 30,
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    },
    {
      title: 'Асептика и антисептика в хирургии',
      description: 'Фундаментальный курс по принципам асептики и антисептики в хирургической практике. Изучение методов стерилизации, обработки операционного поля, профилактики инфекционных осложнений.',
      level: "BASIC",
      durationHours: 20,
      imageUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    },
    {
      title: 'Основы лапароскопической техники',
      description: 'Введение в малоинвазивную хирургию для начинающих. Изучение оборудования, базовых навыков работы с инструментами, принципов установки портов и основных лапароскопических приемов.',
      level: "BASIC",
      durationHours: 35,
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    },
    {
      title: 'Предоперационная подготовка пациента',
      description: 'Комплексный подход к подготовке пациента к абдоминальной операции. Включает оценку рисков, предоперационное обследование, психологическую подготовку и коррекцию сопутствующих заболеваний.',
      level: "BASIC",
      durationHours: 25,
      imageUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
    },
    // ПРОДВИНУТЫЕ КУРСЫ (5 курсов)
    {
      title: 'Лапароскопическая холецистэктомия: от А до Я',
      description: 'Углубленный курс для начинающих хирургов по технике лапароскопической холецистэктомии. Детальный разбор этапов операции, типичных и атипичных ситуаций, осложнений и их профилактики.',
      level: "ADVANCED",
      durationHours: 50,
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    },
    {
      title: 'Резекция желудка: техника и тактика',
      description: 'Практический курс по различным видам резекции желудка. Включает изучение показаний, техники дистальной и проксимальной резекции, гастрэктомии, реконструктивных методов и управления осложнениями.',
      level: "ADVANCED",
      durationHours: 60,
      imageUrl: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80',
    },
    {
      title: 'Колоректальная хирургия: современные подходы',
      description: 'Современные техники в колоректальной хирургии, включая лапароскопические резекции толстой кишки, передние резекции прямой кишки, техники TME. Акцент на онкологические принципы и функциональные результаты.',
      level: "ADVANCED",
      durationHours: 70,
      imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    },
    {
      title: 'Герниопластика: открытые и эндоскопические методы',
      description: 'Комплексное изучение техник грыжесечения: паховые, бедренные, пупочные, послеоперационные грыжи. Сравнение открытых и лапароскопических методов (TAPP, TEP), выбор сетчатых имплантов.',
      level: "ADVANCED",
      durationHours: 45,
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    },
    {
      title: 'Управление интраоперационными осложнениями',
      description: 'Курс по распознаванию и управлению интраоперационными осложнениями в абдоминальной хирургии. Кровотечения, повреждения органов, технические сложности и их решение в режиме реального времени.',
      level: "ADVANCED",
      durationHours: 40,
      imageUrl: 'https://pub.mdpi-res.com/diagnostics/diagnostics-14-01346/article_deploy/html/images/diagnostics-14-01346-g001.png?1720501292',
    },
    // ЭКСПЕРТНЫЕ КУРСЫ (5 курсов)
    {
      title: 'Роботизированная хирургия Da Vinci: мастер-класс',
      description: 'Передовой курс по роботизированной хирургии для опытных хирургов. Изучение системы Da Vinci, техники сложных вмешательств, преимущества и ограничения роботизированного доступа в абдоминальной хирургии.',
      level: "EXPERT",
      durationHours: 80,
      imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
    },
    {
      title: 'Резекция печени: от сегментэктомии до гепатэктомии',
      description: 'Экспертный курс по хирургии печени. Анатомия Куино, виды резекций, техники паренхиматозной диссекции, контроль кровотечения, роль эмболизации воротной вены, ALPPS процедура.',
      level: "EXPERT",
      durationHours: 90,
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Панкреатодуоденальная резекция: операция Уиппла',
      description: 'Высокоспециализированный курс по одной из самых сложных операций в абдоминальной хирургии. Детальный разбор этапов, анатомических вариантов, реконструктивных методов и управления послеоперационными осложнениями.',
      level: "EXPERT",
      durationHours: 100,
      imageUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Эзофагэктомия: торако-абдоминальные подходы',
      description: 'Мастер-класс по резекции пищевода при онкологических заболеваниях. Трансторакальный и транхиатальный доступы, трехпольная лимфодиссекция, реконструкция желудочным и кишечным трансплантатом.',
      level: "EXPERT",
      durationHours: 85,
      imageUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Реоперации в абдоминальной хирургии',
      description: 'Экспертный курс по повторным вмешательствам при послеоперационных осложнениях, рецидивах опухолей и несостоятельности анастомозов. Стратегии планирования, техники адгезиолизиса, damage control хирургия.',
      level: "EXPERT",
      durationHours: 75,
      imageUrl: 'https://l450v.alamy.com/450v/2hhmh69/a-team-of-surgeons-performing-abdominal-surgery-on-a-patient-to-remove-a-cancerous-tumor-in-the-intestines-selective-focus-hands-of-surgeons-during-surgery-on-the-abdominal-cavity-of-a-person-2hhmh69.jpg',
    },
  ];

  const courses = [];
  for (const courseData of coursesData) {
    const course = await prisma.course.create({ data: courseData });
    courses.push(course);
  }

  console.log('✅ Курсы созданы (15 курсов)');

  // Создание видео (30 видео)
  const videos = [
    // WEBSURG PROFESSIONAL VIDEOS - Esophagogastric Surgery (16 видео)
    // Note: Requires WebSurg subscription to view
    {
      title: 'Minimally Invasive Ivor Lewis Esophagectomy',
      description: 'Two-field lymphadenectomy for Siewert II tumors using minimally invasive approach. Professional surgical video from WebSurg platform.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7154',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 579,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    },
    {
      title: 'Robotic Esophagojejunostomy in Total Gastrectomy',
      description: 'Laparoscopic total gastrectomy with robotic esophagojejunostomy anastomosis. WebSurg professional educational content.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7509',
      operationType: "GASTRECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 594,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Laparoscopic Distal Gastrectomy with Billroth I',
      description: 'D2 lymphadenectomy with modified delta-shaped Billroth I reconstruction. Professional WebSurg video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7402',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 810,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80',
    },
    {
      title: 'Totally Laparoscopic Pylorus-Preserving Gastrectomy',
      description: 'Early gastric cancer treatment with pylorus preservation technique. WebSurg professional video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7403',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 697,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    },
    {
      title: 'Mucosal Injury During Laparoscopic Heller Cardiomyotomy',
      description: 'Management of Dor fundoplication for esophageal perforation repair. WebSurg educational video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7287',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 704,
      thumbnailUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    },
    {
      title: 'Robotic Single Port Toupet Fundoplication',
      description: 'Implementation of da Vinci SP system for anti-reflux surgery. Professional WebSurg content.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7180',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 579,
      thumbnailUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    },
    {
      title: 'Transthoracic Robotic Esophagectomy',
      description: 'Comprehensive surgical technique for esophageal cancer resection. WebSurg professional video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en6893',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 3424,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Totally Laparoscopic Gastrectomy with D2 Lymphadenectomy',
      description: 'Intracorporeal Roux-en-Y reconstruction for gastric cancer. WebSurg educational content.',
      videoUrl: 'https://websurg.com/en/doi/vd01en6889',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 1023,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    },
    {
      title: 'Lymphadenectomy in Esophageal Resection',
      description: 'Systematic approach to lymph node dissection during esophagectomy. WebSurg professional video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en6654',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 2011,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    },
    {
      title: 'Salvage Endoscopic Submucosal Resection (ESR)',
      description: 'ESO technique for residual or recurrent early esophageal neoplasia. WebSurg video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en6632',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 1013,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Minimally Invasive Ivor Lewis for Caustic Stricture',
      description: 'Stepwise approach to esophageal reconstruction after caustic injury. WebSurg professional content.',
      videoUrl: 'https://websurg.com/en/doi/vd01en6631',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 816,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Robotic-Assisted Enucleation of Esophageal Leiomyoma',
      description: 'Minimally invasive technique for benign esophageal tumor removal. WebSurg video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en6630',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "ROBOTIC",
      difficulty: "MEDIUM",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 580,
      thumbnailUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    },
    {
      title: 'Laparoscopic Management of Post-Esophagectomy Hernia',
      description: 'Acute diaphragmatic hernia repair after esophageal resection. WebSurg professional video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7405',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 497,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Epiphrenic Diverticula Surgery',
      description: 'Laparoscopic approach to distal esophageal diverticula. WebSurg educational video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7096',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 1023,
      thumbnailUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    },
    {
      title: 'EUS-Guided Radiofrequency Ablation of Pancreatic NET',
      description: 'Pancreatic neuroendocrine tumor treatment using endoscopic ultrasound. WebSurg video.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7404',
      operationType: "PANCREATIC_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 594,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    },
    {
      title: 'EUS-Guided Biliary Drainage for Pancreatic Cancer',
      description: 'Obstructive jaundice management in advanced pancreatic cancer. WebSurg professional content.',
      videoUrl: 'https://websurg.com/en/doi/vd01en7406',
      operationType: "PANCREATIC_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 809,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    },
    // NEW WEBSURG VIDEOS - EXPANDED LIBRARY (20 новых видео)
    {
      title: 'Techniques of Hemostasis in Variceal Bleeding',
      description: 'Comprehensive demonstration of endoscopic hemostasis techniques for esophageal variceal bleeding management. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7582',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'M Ibrahim',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Technique of Upper GI Polypectomy and Mucosal Resection',
      description: 'Advanced endoscopic techniques for upper gastrointestinal polypectomy and mucosal resection in the esophagus. Detailed step-by-step approach. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7583',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'M Giovannini',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 28,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    },
    {
      title: 'Totally Robotic Esophagectomy and Esophagocoloplasty',
      description: 'Complete robotic approach to esophagectomy with esophagocoloplasty for severe esophageal caustic burn and stenosis. Advanced surgical technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7584',
      operationType: "ESOPHAGECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'A Pini Prato',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 13,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Endotherapy for Zenker\'s and Epiphrenic Diverticula',
      description: 'Endoscopic treatment approaches for Zenker\'s diverticulum and epiphrenic diverticula. Modern minimally invasive techniques. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7585',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'P Familiari',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Laparoscopic Heller Cardiomyotomy and Dor Fundoplication',
      description: 'Stepwise approach to laparoscopic Heller\'s cardiomyotomy with Dor fundoplication for achalasia treatment. Detailed surgical technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7154',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'B Barbosa, AM Marques',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Intrathoracic Anastomosis in RAMIE',
      description: 'Robot-assisted minimally invasive esophagectomy (RAMIE) with intrathoracic anastomosis technique. Advanced robotic surgery demonstration. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7586',
      operationType: "ESOPHAGECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'R Van Hillegersberg',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 21,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    },
    {
      title: 'Robotic Heller Cardiomyotomy with Dor Fundoplication',
      description: 'Robotic-assisted Heller\'s cardiomyotomy with Dor fundoplication for type II achalasia. State-of-the-art robotic technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7587',
      operationType: "ESOPHAGECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'N Premraj, P Patel',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Zenker\'s Diverticulum: Surgical and Endoscopic Treatment',
      description: 'Comprehensive overview of both surgical and endoscopic treatment options for Zenker\'s diverticulum. Comparative technique analysis. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7588',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 12,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
    },
    {
      title: 'Endoscopic Resection of Duodenal Adenomas',
      description: 'Advanced endoscopic mucosal resection technique for duodenal adenomas. Precise lesion removal and complication prevention. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7589',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    },
    {
      title: 'Endoscopic Papillectomy Technique',
      description: 'Endoscopic papillectomy for ampullary lesions. Step-by-step technique with expert commentary on complication management. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7590',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    },
    {
      title: 'Laparoscopic Ivor-Lewis with Standard Mediastinal Lymphadenectomy',
      description: 'Laparoscopic Ivor-Lewis esophagectomy with standard mediastinal lymphadenectomy for esophageal cancer. Complete oncological resection. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7591',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'N Zaala, H Martini Ortiz',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 6,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
    },
    {
      title: 'Post-Esophagectomy Hiatal Hernia Repair',
      description: 'Laparoscopic repair of post-esophagectomy hiatal hernia. Management of common post-operative complication. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7592',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'I Bertão Colaço, O Gaspar',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 9,
      thumbnailUrl: 'https://s3-eu-west-1.amazonaws.com/clinicalrobotics-user-upload/output/CRSA_51002/Thumbnails/CRSA_51002.0000004.jpg',
    },
    {
      title: 'Robotic Gastrectomy with D2 Lymphadenectomy',
      description: 'Robotic total gastrectomy with extended D2 lymph node dissection for gastric cancer. Advanced oncological technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7593',
      operationType: "GASTRECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 18,
      thumbnailUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    },
    {
      title: 'Laparoscopic Distal Gastrectomy with Modified Billroth I',
      description: 'Modified delta-shaped Billroth I reconstruction following laparoscopic distal gastrectomy with D2 lymphadenectomy. Innovative reconstruction technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7402',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'B Pomortsev, V Basylian',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    },
    {
      title: 'Esophageal Perforation Management',
      description: 'Surgical and endoscopic management strategies for esophageal perforation. Emergency procedure techniques and complication prevention. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7594',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 22,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Endoscopic Stent Placement for Esophageal Strictures',
      description: 'Endoscopic placement of self-expanding metal stents for benign and malignant esophageal strictures. Palliative and therapeutic approach. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7595',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 12,
      thumbnailUrl: 'https://jomi.com/api/files/0427_still_edited--1713387123483.jpg',
    },
    {
      title: 'Robotic Proximal Gastrectomy with Double-Tract Reconstruction',
      description: 'Robotic proximal gastrectomy with innovative double-tract reconstruction for upper gastric cancer. Functional preservation technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7596',
      operationType: "GASTRECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 19,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
    },
    {
      title: 'Peroral Endoscopic Myotomy (POEM) for Achalasia',
      description: 'Peroral endoscopic myotomy (POEM) technique for treatment of achalasia. Modern endoscopic alternative to Heller myotomy. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7597',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 25,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Laparoscopic Paraesophageal Hernia Repair',
      description: 'Complete laparoscopic repair of large paraesophageal hernia with mesh reinforcement and fundoplication. Complex hernia management. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7598',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 17,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Endoscopic Submucosal Dissection for Early Gastric Cancer',
      description: 'Advanced endoscopic submucosal dissection (ESD) technique for early gastric cancer removal. Curative endoscopic resection. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7599',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 24,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    },
    // NEW WEBSURG VIDEOS - ENDOSCOPIC SURGERY (15 новых видео)
    {
      title: 'Video-Endoscopic Inguinal Lymphadenectomy for Merkel Cell Carcinoma',
      description: 'Advanced video-endoscopic technique for inguinal lymphadenectomy in Merkel cell carcinoma nodal metastasis management. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7700',
      operationType: "OTHER",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'CS Rodrigues',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    },
    {
      title: 'Linear-Stapled Esophagojejunostomy in Laparoscopic Total Gastrectomy',
      description: 'Innovative linear-stapled reconstruction technique for esophagojejunostomy following laparoscopic total gastrectomy. Modern anastomotic approach. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7701',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'D Venâncio Dionísio',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    },
    {
      title: 'Perianal Extended Endoscopic Submucosal Dissection',
      description: 'Extended endoscopic submucosal dissection technique for perianal lesions extending to the lower rectum. Complex ESD procedure. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7702',
      operationType: "COLORECTAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 13,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    },
    {
      title: 'Endoscopic Repermeabilization of Common Bile Duct Transection',
      description: 'Endoscopic approach to repermeabilization of a common bile duct (CBD) transection. Advanced biliary reconstruction technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7703',
      operationType: "HEPATOBILIARY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    },
    {
      title: 'Laparoscopic Hepaticojejunostomy for Strasberg E3 Bile Duct Injury',
      description: 'Laparoscopic hepaticojejunostomy for Strasberg E3 bile duct injury repair. Complex biliary reconstruction after iatrogenic injury. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7704',
      operationType: "HEPATOBILIARY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'J Barisian-Hernandez, LF Fraga-Ramos',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 13,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    },
    {
      title: 'Endoscopic Thoracic Sympathectomy for Primary Palmar Hyperhidrosis',
      description: 'Endoscopic thoracic sympathectomy (ETS) technique for treatment of primary palmar hyperhidrosis. Minimally invasive sympathetic chain resection. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7705',
      operationType: "THORACIC_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'M Abdelbaky, SH Emile, M Balata, M Fathy',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 14,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Endoscopic Surgical Anatomy of the Abdominal Wall',
      description: 'Comprehensive endoscopic surgical anatomy of the abdominal wall. Educational demonstration for laparoscopic surgeons. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7706',
      operationType: "OTHER",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'V Badu',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 13,
      thumbnailUrl: 'https://i.ytimg.com/vi/bVuOMua60NU/hqdefault.jpg',
    },
    {
      title: 'Endoscopic Totally Extraperitoneal Inguinal Hernia Repair (TEP)',
      description: 'Endoscopic totally extraperitoneal preperitoneal (TEP) technique for inguinal hernia repair. Modern minimally invasive hernia surgery. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7707',
      operationType: "HERNIA_REPAIR",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'J García-Quijada García, M González Boscamona',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 6,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Combined Robotic Endoscopic Surgery (CRES) for Tubulovillous Adenoma',
      description: 'Combined robotic endoscopic surgery (CRES) approach for tubulovillous adenoma with high-grade dysplasia. Innovative hybrid technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7708',
      operationType: "COLORECTAL_SURGERY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'A Jaramillo, M Carreiro',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 12,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Posterior Endoscopic Groin Anatomy',
      description: 'Detailed endoscopic anatomy of the posterior groin region for inguinal hernia surgery. Educational anatomical demonstration. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7709',
      operationType: "OTHER",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'M Busse',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 13,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
    },
    {
      title: 'Transvaginal Natural Orifice Transluminal Endoscopic Surgery (vNOTES)',
      description: 'Transvaginal natural orifice transluminal endoscopic surgery (vNOTES) hysterectomy. Advanced natural orifice surgery technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7710',
      operationType: "GYNECOLOGIC_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'S Naval',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 14,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'ERCP for Common Bile Duct Stone Extraction',
      description: 'Endoscopic retrograde cholangiopancreatography (ERCP) for common bile duct (CBD) stone extraction. Live educational procedure. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7711',
      operationType: "HEPATOBILIARY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'GF Donatelli, B Saeliger',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 9,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    },
    {
      title: 'Endoscopic Submucosal Dissection (ESD) of the Rectum',
      description: 'Advanced endoscopic submucosal dissection (ESD) of the rectum for large laterally spreading tumor. Complex colorectal ESD. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7712',
      operationType: "COLORECTAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 43,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    },
    {
      title: 'Endoscopic Management of Esophageal Variceal Bleeding',
      description: 'Advanced endoscopic techniques for management of acute esophageal variceal bleeding. Emergency endoscopic hemostasis. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7713',
      operationType: "ESOPHAGECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 18,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Endoscopic Full-Thickness Resection (EFTR) Technique',
      description: 'Endoscopic full-thickness resection (EFTR) for gastric and duodenal lesions. Advanced endoscopic resection technique. WebSurg professional content.',
      videoUrl: 'https://websurg.com/ru/doi/vd01ru7714',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'WebSurg Specialists',
      clinic: 'IRCAD WebSurg',
      durationMinutes: 16,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    },
    // iLAPPSURGERY FREE EDUCATIONAL MODULES (12 видео)
    // Note: Free educational content from iLappSurgery Foundation (Belgium)
    {
      title: 'iLappLiver: Introduction to Laparoscopic Liver Surgery',
      description: 'Comprehensive introduction to laparoscopic liver surgery including clinical evidence, surgical anatomy, and stepwise approach. Free educational module from iLappSurgery Foundation.',
      videoUrl: 'https://www.ilappsurgery.com/iLappLiver/en/introduction.html',
      operationType: "LIVER_RESECTION",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 480,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'iLappLiver: Clinical Evidence in Liver Surgery',
      description: 'Evidence-based approach to laparoscopic liver surgery, reviewing latest research and clinical outcomes. Interactive educational module with expert commentary.',
      videoUrl: 'https://www.ilappsurgery.com/iLappLiver/en/clinical-evidence.html',
      operationType: "LIVER_RESECTION",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 360,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    },
    {
      title: 'iLappLiver: Surgical Anatomy of the Liver',
      description: 'Detailed 3D anatomical guide for laparoscopic liver surgery. Interactive module covering segmental anatomy, vascular structures, and surgical landmarks.',
      videoUrl: 'https://www.ilappsurgery.com/iLappLiver/en/surgical-anatomy.html',
      operationType: "LIVER_RESECTION",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 300,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
    },
    {
      title: 'iLappLiver: Laparoscopic Minor Liver Resections',
      description: 'Step-by-step guide to laparoscopic minor hepatectomies including anterior segment resections and left lateral sectionectomy. Free educational content.',
      videoUrl: 'https://www.ilappsurgery.com/iLappLiver/en/minor-resections.html',
      operationType: "LIVER_RESECTION",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 420,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    },
    {
      title: 'iLappLiver: Laparoscopic Major Hepatectomy',
      description: 'Advanced techniques for major liver resections including left and right hemihepatectomy. Comprehensive video module with expert commentary and 3D visualization.',
      videoUrl: 'https://www.ilappsurgery.com/iLappLiver/en/major-resections.html',
      operationType: "LIVER_RESECTION",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 540,
      thumbnailUrl: 'https://i.ytimg.com/vi/v_kxtKHAJb4/maxresdefault.jpg',
    },
    {
      title: 'iLappRectum: Introduction to TaTME Surgery',
      description: 'Transanal Total Mesorectal Excision (TaTME) comprehensive introduction. Free educational module covering technique, indications, and outcomes from iLappSurgery.',
      videoUrl: 'https://www.ilappsurgery.com/iLappRectum/en/introduction.html',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 360,
      thumbnailUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    },
    {
      title: 'iLappRectum: TaTME Surgical Technique',
      description: 'Detailed step-by-step TaTME surgical technique with video demonstrations. Interactive learning module with annotations and expert insights.',
      videoUrl: 'https://www.ilappsurgery.com/iLappRectum/en/surgical-technique.html',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 480,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'iLappRectum: Pelvic Anatomy for Rectal Surgery',
      description: '3D anatomical guide to pelvic structures relevant to rectal surgery. Interactive module covering mesorectal fascia, neurovascular bundles, and surgical planes.',
      videoUrl: 'https://www.ilappsurgery.com/iLappRectum/en/pelvic-anatomy.html',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 300,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'iLappColon: Laparoscopic Colectomy Techniques',
      description: 'Comprehensive overview of laparoscopic colon resection techniques including right, left, and sigmoid colectomy. Free educational module with surgical videos.',
      videoUrl: 'https://www.ilappsurgery.com/iLappColon/en/introduction.html',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 420,
      thumbnailUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    },
    {
      title: 'iLappColon: Vascular Anatomy in Colonic Surgery',
      description: 'Detailed vascular anatomy for colon surgery including superior and inferior mesenteric vessels. Interactive 3D visualization and surgical landmarks.',
      videoUrl: 'https://www.ilappsurgery.com/iLappColon/en/vascular-anatomy.html',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 270,
      thumbnailUrl: 'http://coloproctol.org/upload/thumbnails/ac-2017-08-05f1.jpg',
    },
    {
      title: 'iLappColon: Complete Mesocolic Excision (CME)',
      description: 'Advanced oncological technique for colon cancer surgery. Comprehensive video module covering CME principles, technique, and outcomes.',
      videoUrl: 'https://www.ilappsurgery.com/iLappColon/en/cme-technique.html',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 390,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
    },
    {
      title: 'iLappSurgery: Laparoscopic Ultrasound in Surgery',
      description: 'Essential guide to intraoperative laparoscopic ultrasound for liver and colorectal surgery. Free educational module with practical demonstrations.',
      videoUrl: 'https://www.ilappsurgery.com/educational/laparoscopic-ultrasound.html',
      operationType: "LIVER_RESECTION",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'iLappSurgery Foundation',
      clinic: 'iLappSurgery Belgium',
      durationMinutes: 240,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
    },
    // ДОПОЛНИТЕЛЬНЫЕ ЛАПАРОСКОПИЧЕСКИЕ ОПЕРАЦИИ (9 видео)
    {
      title: 'Лапароскопическая холецистэктомия: стандартная техника',
      description: 'Детальная демонстрация этапов стандартной лапароскопической холецистэктомии. Установка портов, выделение треугольника Кало, клипирование и пересечение пузырного протока и артерии, удаление желчного пузыря. Продолжительность операции 45 минут.',
      videoUrl: 'https://player.vimeo.com/video/76979871',
      operationType: "CHOLECYSTECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "BASIC",
      author: 'Prof. James Anderson',
      clinic: 'Mayo Clinic',
      durationMinutes: 45,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    },
    {
      title: 'Лапароскопическая холецистэктомия при остром холецистите',
      description: 'Техника лапароскопической холецистэктомии у пациента с острым флегмонозным холециститом. Особенности выделения в условиях воспаления, методы безопасной диссекции, профилактика осложнений.',
      videoUrl: 'https://player.vimeo.com/video/148751763',
      operationType: "CHOLECYSTECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'Dr. Michael Peterson',
      clinic: 'Johns Hopkins Hospital',
      durationMinutes: 68,
      thumbnailUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    },
    {
      title: 'Лапароскопическая аппендэктомия',
      description: 'Стандартная техника лапароскопической аппендэктомии при остром аппендиците. Диагностическая лапароскопия, мобилизация червеобразного отростка, обработка брыжейки и основания, удаление в контейнере.',
      videoUrl: 'https://player.vimeo.com/video/90509568',
      operationType: "APPENDECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "BASIC",
      author: 'Dr. Robert Wilson',
      clinic: 'Cleveland Clinic',
      durationMinutes: 32,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Лапароскопическая правосторонняя гемиколэктомия',
      description: 'Онкологически адекватная правосторонняя гемиколэктомия лапароскопическим доступом. Мобилизация правых отделов ободочной кишки, лигирование сосудов у основания, удаление препарата, интракорпоральный анастомоз.',
      videoUrl: 'https://player.vimeo.com/video/90682589',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'Prof. David Miller',
      clinic: 'MD Anderson Cancer Center',
      durationMinutes: 185,
      thumbnailUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    },
    {
      title: 'Лапароскопическая передняя резекция прямой кишки с TME',
      description: 'Техника передней резекции прямой кишки при раке с тотальной мезоректумэктомией. Мобилизация по эмбриональным слоям, сохранение автономных нервов, техника TME, колоректальный анастомоз.',
      videoUrl: 'https://player.vimeo.com/video/179028914',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'Dr. Christopher Lee',
      clinic: 'St. Mark Hospital',
      durationMinutes: 245,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Лапароскопическая пластика паховой грыжи (TAPP)',
      description: 'Трансабдоминальная преперитонеальная пластика паховой грыжи с использованием сетчатого импланта. Особенности визуализации грыжевых ворот, установка и фиксация сетки, закрытие брюшины.',
      videoUrl: 'https://player.vimeo.com/video/242789884',
      operationType: "HERNIA_REPAIR",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'Dr. Thomas Martinez',
      clinic: 'Massachusetts General Hospital',
      durationMinutes: 55,
      thumbnailUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    },
    {
      title: 'Лапароскопическая фундопликация по Ниссену',
      description: 'Антирефлюксная операция при грыже пищеводного отверстия диафрагмы и ГЭРБ. Мобилизация дна желудка, закрытие ножек диафрагмы, формирование 360° манжеты вокруг пищевода.',
      videoUrl: 'https://player.vimeo.com/video/336812660',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'Prof. Richard Brown',
      clinic: 'Stanford Health Care',
      durationMinutes: 125,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Лапароскопическая резекция сигмовидной кишки',
      description: 'Резекция сигмовидной кишки при дивертикулярной болезни лапароскопическим доступом. Мобилизация левых отделов, перевязка нижней брыжеечной артерии, колоректальный анастомоз.',
      videoUrl: 'https://player.vimeo.com/video/178093578',
      operationType: "COLECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'Dr. Andrew Thompson',
      clinic: 'University Hospital Zurich',
      durationMinutes: 156,
      thumbnailUrl: 'https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-1-4939-1893-5_7/MediaObjects/312011_1_En_7_Fig2_HTML.gif',
    },
    {
      title: 'Лапароскопическая дистальная резекция желудка',
      description: 'Дистальная субтотальная резекция желудка с D2 лимфодиссекцией при раке. Лапароскопическая техника, мобилизация желудка, формирование гастроеюноанастомоза по Ру.',
      videoUrl: 'https://player.vimeo.com/video/19231868',
      operationType: "GASTRECTOMY",
      method: "LAPAROSCOPIC",
      difficulty: "HIGH",
      author: 'Prof. John Williams',
      clinic: 'Memorial Sloan Kettering Cancer Center',
      durationMinutes: 278,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Лапароскопическая спленэктомия',
      description: 'Лапароскопическое удаление селезенки при идиопатической тромбоцитопенической пурпуре. Мобилизация селезенки, контроль сосудистой ножки, морцелляция и удаление через порт.',
      videoUrl: 'https://player.vimeo.com/video/290512680',
      operationType: "OTHER",
      method: "LAPAROSCOPIC",
      difficulty: "MEDIUM",
      author: 'Dr. Daniel Garcia',
      clinic: 'Brigham and Womens Hospital',
      durationMinutes: 95,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    },
    // РОБОТИЗИРОВАННЫЕ ОПЕРАЦИИ (8 видео)
    {
      title: 'Роботизированная гастрэктомия с D2 лимфодиссекцией',
      description: 'Тотальная гастрэктомия с расширенной лимфодиссекцией D2 с использованием системы Da Vinci. Преимущества роботизированного доступа в диссекции лимфоузлов, формирование пищеводно-кишечного анастомоза.',
      videoUrl: 'https://player.vimeo.com/video/76979871',
      operationType: "GASTRECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'Prof. William Harris',
      clinic: 'National Cancer Institute',
      durationMinutes: 325,
      thumbnailUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
    },
    {
      title: 'Роботизированная низкая передняя резекция прямой кишки',
      description: 'Передняя резекция прямой кишки с TME роботической системой Da Vinci Xi. Точная диссекция в узком тазу, сохранение нервов, интракорпоральный анастомоз.',
      videoUrl: 'https://player.vimeo.com/video/148751763',
      operationType: "COLECTOMY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'Dr. Charles Martin',
      clinic: 'Cleveland Clinic Florida',
      durationMinutes: 289,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    },
    {
      title: 'Роботизированная правосторонняя гепатэктомия',
      description: 'Анатомическая резекция правой доли печени роботизированным доступом. Контроль сосудистых структур, паренхиматозная диссекция, гемостаз. Возможности роботизированной хирургии печени.',
      videoUrl: 'https://player.vimeo.com/video/90509568',
      operationType: "LIVER_RESECTION",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'Prof. Paul Jackson',
      clinic: 'Cedars-Sinai Medical Center',
      durationMinutes: 385,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Роботизированная панкреатодуоденальная резекция',
      description: 'Операция Уиппла с использованием Da Vinci. Роботизированная техника сложнейшей операции: резекция головки поджелудочной железы с двенадцатиперстной кишкой, реконструкция с тремя анастомозами.',
      videoUrl: 'https://player.vimeo.com/video/90682589',
      operationType: "PANCREATIC_SURGERY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'Prof. Steven White',
      clinic: 'MD Anderson Cancer Center',
      durationMinutes: 445,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    },
    {
      title: 'Роботизированная эзофагэктомия по Льюису',
      description: 'Субтотальная резекция пищевода роботизированным доступом. Абдоминальный и торакальный этапы, мобилизация желудочной трубки, внутригрудной анастомоз.',
      videoUrl: 'https://player.vimeo.com/video/179028914',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'Dr. Edward Robinson',
      clinic: 'Mount Sinai Hospital',
      durationMinutes: 412,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Роботизированная дистальная резекция поджелудочной железы',
      description: 'Резекция хвоста поджелудочной железы с сохранением селезенки роботизированным доступом. Прецизионная диссекция, сохранение селезеночных сосудов, обработка панкреатического среза.',
      videoUrl: 'https://player.vimeo.com/video/242789884',
      operationType: "PANCREATIC_SURGERY",
      method: "ROBOTIC",
      difficulty: "HIGH",
      author: 'Dr. Kenneth Clark',
      clinic: 'MD Anderson Cancer Center',
      durationMinutes: 215,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    },
    {
      title: 'Роботизированная пластика паховой грыжи (rTAPP)',
      description: 'Трансабдоминальная роботизированная герниопластика с установкой сетки. Преимущества роботических манипуляторов в интракорпоральном шве и точной позиционировании импланта.',
      videoUrl: 'https://player.vimeo.com/video/336812660',
      operationType: "HERNIA_REPAIR",
      method: "ROBOTIC",
      difficulty: "MEDIUM",
      author: 'Dr. Benjamin Lewis',
      clinic: 'University of California Medical Center',
      durationMinutes: 75,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    },
    {
      title: 'Роботизированная резекция желудка при GIST',
      description: 'Клиновидная резекция желудка при гастроинтестинальной стромальной опухоли. Роботизированная техника позволяет точно резецировать опухоль с сохранением функции желудка.',
      videoUrl: 'https://player.vimeo.com/video/178093578',
      operationType: "GASTRECTOMY",
      method: "ROBOTIC",
      difficulty: "MEDIUM",
      author: 'Dr. Matthew Walker',
      clinic: 'UCLA Medical Center',
      durationMinutes: 148,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80',
    },
    // ОТКРЫТЫЕ ОПЕРАЦИИ (8 видео)
    {
      title: 'Открытая гастрэктомия с D2 лимфодиссекцией',
      description: 'Классическая тотальная гастрэктомия открытым доступом при раке желудка. Верхнесрединная лапаротомия, мобилизация желудка, расширенная лимфодиссекция D2, реконструкция по Ру.',
      videoUrl: 'https://player.vimeo.com/video/19231868',
      operationType: "GASTRECTOMY",
      method: "OPEN",
      difficulty: "HIGH",
      author: 'Prof. John Williams',
      clinic: 'Memorial Sloan Kettering Cancer Center',
      durationMinutes: 285,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Открытая правосторонняя гепатэктомия',
      description: 'Анатомическая резекция правой доли печени открытым доступом. Мобилизация печени, контроль сосудистых структур ворот, паренхиматозная диссекция ультразвуковым скальпелем.',
      videoUrl: 'https://player.vimeo.com/video/290512680',
      operationType: "LIVER_RESECTION",
      method: "OPEN",
      difficulty: "HIGH",
      author: 'Prof. Paul Jackson',
      clinic: 'Cedars-Sinai Medical Center',
      durationMinutes: 342,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Открытая панкреатодуоденальная резекция (операция Уиппла)',
      description: 'Классическая операция Уиппла открытым доступом при раке головки поджелудочной железы. Детальная демонстрация резекционного и реконструктивного этапов с тремя анастомозами.',
      videoUrl: 'https://player.vimeo.com/video/76979871',
      operationType: "PANCREATIC_SURGERY",
      method: "OPEN",
      difficulty: "HIGH",
      author: 'Prof. Joseph Young',
      clinic: 'NewYork-Presbyterian Hospital',
      durationMinutes: 395,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
    },
    {
      title: 'Открытая холецистэктомия при осложненном холецистите',
      description: 'Холецистэктомия из минилапаротомного доступа при деструктивном холецистите. Показания к открытому доступу, техника выделения в инфильтрате, наружное дренирование.',
      videoUrl: 'https://player.vimeo.com/video/148751763',
      operationType: "CHOLECYSTECTOMY",
      method: "OPEN",
      difficulty: "MEDIUM",
      author: 'Dr. Timothy Allen',
      clinic: 'Toronto General Hospital',
      durationMinutes: 78,
      thumbnailUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    },
    {
      title: 'Открытая брюшно-промежностная экстирпация прямой кишки',
      description: 'Экстирпация прямой кишки при низком раке прямой кишки. Абдоминальный и промежностный этапы, формирование концевой колостомы. Техника тазовой диссекции.',
      videoUrl: 'https://player.vimeo.com/video/90509568',
      operationType: "COLECTOMY",
      method: "OPEN",
      difficulty: "HIGH",
      author: 'Prof. Charles Martin',
      clinic: 'Cleveland Clinic Florida',
      durationMinutes: 265,
      thumbnailUrl: 'https://i.ytimg.com/vi/uWPqpiw30NM/mqdefault.jpg',
    },
    {
      title: 'Открытая пластика гигантской вентральной грыжи',
      description: 'Герниопластика гигантской послеоперационной вентральной грыжи с установкой сетчатого импланта. Техника разделения компонентов брюшной стенки, профилактика рецидива.',
      videoUrl: 'https://player.vimeo.com/video/90682589',
      operationType: "HERNIA_REPAIR",
      method: "OPEN",
      difficulty: "HIGH",
      author: 'Dr. Samuel King',
      clinic: 'Royal Marsden Hospital',
      durationMinutes: 185,
      thumbnailUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    },
    {
      title: 'Открытая аппендэктомия при аппендикулярном инфильтрате',
      description: 'Аппендэктомия из доступа Волковича-Дьяконова при осложненном аппендиците. Разделение инфильтрата, аппендэктомия, дренирование брюшной полости.',
      videoUrl: 'https://player.vimeo.com/video/179028914',
      operationType: "APPENDECTOMY",
      method: "OPEN",
      difficulty: "MEDIUM",
      author: 'Dr. Mark Wright',
      clinic: 'Brigham and Womens Hospital',
      durationMinutes: 52,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800&q=80',
    },
    {
      title: 'Открытая эзофагэктомия по Льюису',
      description: 'Субтотальная резекция пищевода открытым комбинированным доступом. Абдоминальный этап - мобилизация желудка, торакотомия - резекция пищевода, формирование внутригрудного анастомоза.',
      videoUrl: 'https://player.vimeo.com/video/242789884',
      operationType: "ESOPHAGEAL_SURGERY",
      method: "OPEN",
      difficulty: "HIGH",
      author: 'Prof. Edward Robinson',
      clinic: 'Mount Sinai Hospital',
      durationMinutes: 378,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    },
    // ГИБРИДНЫЕ ОПЕРАЦИИ (4 видео)
    {
      title: 'Гибридная резекция печени: лапароскопия + минидоступ',
      description: 'Резекция 6-7 сегментов печени гибридной техникой. Лапароскопическая мобилизация, контроль сосудов, затем минилапаротомия для безопасной паренхиматозной диссекции.',
      videoUrl: 'https://player.vimeo.com/video/336812660',
      operationType: "LIVER_RESECTION",
      method: "HYBRID",
      difficulty: "HIGH",
      author: 'Dr. Brian Scott',
      clinic: 'UCLA Medical Center',
      durationMinutes: 298,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      title: 'Гибридная гастрэктомия: лапароскопия-ассистированная',
      description: 'Лапароскопия-ассистированная гастрэктомия. Лапароскопический этап мобилизации и лимфодиссекции, экстракция через минилапаротомию, формирование анастомозов открытым способом.',
      videoUrl: 'https://player.vimeo.com/video/178093578',
      operationType: "GASTRECTOMY",
      method: "HYBRID",
      difficulty: "HIGH",
      author: 'Dr. George Turner',
      clinic: 'University Hospital of Geneva',
      durationMinutes: 254,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80',
    },
    {
      title: 'Гибридная колэктомия при раке селезеночного угла',
      description: 'Резекция селезеночного угла ободочной кишки гибридной техникой. Лапароскопическая мобилизация, контроль сосудов, экстракция через малый разрез, внекорпоральный анастомоз.',
      videoUrl: 'https://player.vimeo.com/video/19231868',
      operationType: "COLECTOMY",
      method: "HYBRID",
      difficulty: "MEDIUM",
      author: 'Dr. Patrick Mitchell',
      clinic: 'Cleveland Clinic Florida',
      durationMinutes: 175,
      thumbnailUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    },
    {
      title: 'Гибридная операция при осложненном раке желудка',
      description: 'Гастрэктомия при осложненном стенозирующем раке желудка. Диагностическая лапароскопия, конверсия в лапаротомию, резекция с наложением питательной еюностомы.',
      videoUrl: 'https://player.vimeo.com/video/290512680',
      operationType: "GASTRECTOMY",
      method: "HYBRID",
      difficulty: "HIGH",
      author: 'Prof. John Williams',
      clinic: 'Memorial Sloan Kettering Cancer Center',
      durationMinutes: 312,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80',
    },
  ];

  for (const video of videos) {
    await prisma.video.create({ data: video });
  }

  console.log('✅ Видео созданы (93 видео: 51 WebSurg + 12 iLappSurgery + 30 других)');

  // Создание статей (15 статей)
  const articles = [
    {
      title: 'Принципы онкологической абдоминальной хирургии',
      excerpt: 'Основные принципы радикальной хирургии злокачественных опухолей органов брюшной полости.',
      content: `# Принципы онкологической абдоминальной хирургии

## Введение
Онкологическая хирургия органов брюшной полости требует строгого соблюдения онкологических принципов для достижения радикальности и улучшения отдаленных результатов лечения.

## Основные принципы

### 1. Абластика
Абластика - комплекс мер, направленных на предотвращение диссеминации опухолевых клеток во время операции:
- Минимальная травматизация опухоли
- Лигирование сосудов до манипуляций с опухолью
- Использование барьерных методик (смена инструментов, перчаток)
- Удаление опухоли единым блоком

### 2. Антибластика
Методы уничтожения опухолевых клеток в ране:
- Обработка раны антисептиками
- Использование электрокоагуляции
- Лазерная обработка раны
- Промывание брюшной полости

### 3. Зональность
Принцип зональности предполагает удаление первичной опухоли вместе с зоной регионарного метастазирования:
- Удаление пораженного органа или его части
- Лимфодиссекция соответствующего уровня (D1, D2, D3)
- Единым блоком с клетчаткой и лимфоузлами

### 4. Футлярность
Удаление органа в пределах эмбриональных фасций и клетчаточных пространств.

## Объем лимфодиссекции

### D1 лимфодиссекция
Удаление перигастральных лимфоузлов (при раке желудка).

### D2 лимфодиссекция
Расширенная лимфодиссекция с удалением лимфоузлов второго порядка вдоль магистральных сосудов.

### D3 лимфодиссекция
Супер-расширенная лимфодиссекция (в настоящее время не рекомендуется рутинно).

## Современные тенденции
- Малоинвазивные доступы не должны снижать онкологическую радикальность
- Роботизированная хирургия позволяет выполнять прецизионную лимфодиссекцию
- Мультимодальное лечение (химиотерапия + хирургия) улучшает результаты

## Заключение
Соблюдение онкологических принципов в абдоминальной хирургии является залогом радикальности операции и улучшения отдаленных результатов лечения пациентов со злокачественными новообразованиями.`,
      category: 'Онкохирургия',
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'Ранние послеоперационные осложнения и их профилактика',
      excerpt: 'Обзор наиболее частых послеоперационных осложнений в абдоминальной хирургии и методы их предотвращения.',
      content: `# Ранние послеоперационные осложнения и их профилактика

## Классификация осложнений

### Общие осложнения
1. Пневмония
2. Тромбоэмболические осложнения
3. Сердечно-сосудистые осложнения
4. Делирий

### Специфические хирургические осложнения
1. Кровотечение
2. Несостоятельность анастомозов
3. Панкреатит
4. Инфекционные осложнения раны
5. Кишечная непроходимость

## Несостоятельность анастомозов

### Факторы риска
- Натяжение анастомоза
- Нарушение кровоснабжения
- Технические погрешности
- Системные факторы (гипопротеинемия, анемия)

### Профилактика
- Адекватная мобилизация анастомозируемых отделов
- Проверка кровоснабжения
- Техника наложения (однорядный vs двухрядный шов)
- Использование степлеров
- Превентивные илеостомы при низких анастомозах

## Послеоперационный панкреатит

Частое осложнение после операций на поджелудочной железе.

### Профилактика
- Минимальная травматизация паренхимы
- Адекватное дренирование
- Соматостатин и его аналоги

## Тромбоэмболические осложнения

### Факторы риска
- Онкологические заболевания
- Ожирение
- Длительная иммобилизация
- Возраст

### Профилактика
- Ранняя активизация
- Низкомолекулярные гепарины
- Компрессионный трикотаж
- Пневмокомпрессия

## Enhanced Recovery After Surgery (ERAS)

Современная концепция ускоренной реабилитации снижает частоту осложнений:
- Минимизация предоперационного голодания
- Оптимизация инфузионной терапии
- Эпидуральная аналгезия
- Ранняя активизация и питание
- Профилактика тошноты и рвоты

## Заключение
Профилактика послеоперационных осложнений требует комплексного подхода на всех этапах периоперационного периода.`,
      category: 'Периоперационное ведение',
      publishedAt: new Date('2024-02-01'),
    },
    {
      title: 'Лапароскопическая vs Открытая хирургия: современные данные',
      excerpt: 'Сравнительный анализ результатов лапароскопических и открытых операций на основе современных исследований.',
      content: `# Лапароскопическая vs Открытая хирургия: современные данные

## Введение
За последние 30 лет лапароскопическая хирургия прочно вошла в клиническую практику. Накоплена обширная доказательная база, позволяющая объективно сравнить результаты.

## Преимущества лапароскопического доступа

### Краткосрочные результаты
- Меньший болевой синдром
- Снижение частоты раневых осложнений
- Уменьшение кровопотери
- Короткий срок госпитализации
- Более быстрое восстановление
- Лучший косметический эффект

### Отдаленные результаты
- Меньшая частота спаечной болезни
- Снижение риска послеоперационных грыж

## Онкологические результаты

### Рак толстой кишки
Многочисленные РКИ (COLOR, CLASICC, COST) показали:
- Эквивалентные онкологические результаты
- Не уступающая общая и безрецидивная выживаемость
- Адекватность лимфодиссекции

### Рак желудка
Данные исследований KLASS-02, JCOG0912:
- Сопоставимая R0-резекция
- Достаточный объем лимфодиссекции D2
- Не худшая долгосрочная выживаемость

## Недостатки лапароскопии

### Технические ограничения
- Двумерное изображение
- Отсутствие тактильной обратной связи
- Ограниченная свобода движений инструментов
- Длительная кривая обучения

### Специфические осложнения
- Риск троакарных грыж
- Повреждения при введении портов
- Проблемы пневмоперитонеума

## Показания к открытому доступу

### Абсолютные
- Невозможность пневмоперитонеума
- Массивные спайки
- Неконтролируемое кровотечение

### Относительные
- Гигантские опухоли
- Инвазия в окружающие органы
- Экстренные ситуации

## Гибридные техники

Комбинация преимуществ обоих доступов:
- Лапароскопическая мобилизация
- Экстракция через мини-доступ
- Формирование анастомозов открытым способом

## Роботизированная хирургия

Преодолевает некоторые недостатки лапароскопии:
- Трехмерное изображение
- 7 степеней свободы инструментов
- Фильтрация тремора
- Эргономика для хирурга

## Заключение
Выбор доступа должен быть индивидуализирован с учетом заболевания, опыта хирурга и технического оснащения клиники. В опытных руках лапароскопический доступ не уступает открытому по радикальности при значительных преимуществах в послеоперационном периоде.`,
      category: 'Хирургическая техника',
      publishedAt: new Date('2024-02-15'),
    },
    {
      title: 'Роботизированная хирургия Da Vinci: настоящее и будущее',
      excerpt: 'Обзор современного состояния роботизированной хирургии и перспективы ее развития.',
      content: `# Роботизированная хирургия Da Vinci: настоящее и будущее

## История развития

Система Da Vinci впервые одобрена FDA в 2000 году. За 20+ лет произошла эволюция от da Vinci Standard до современных моделей Xi и SP.

## Технические характеристики

### Преимущества над лапароскопией
1. Трехмерное HD-изображение с увеличением до 10x
2. Инструменты Endowrist с 7 степенями свободы
3. Устранение физиологического тремора
4. Эргономичная консоль для хирурга
5. Масштабирование движений (движение руки на 5 см = движение инструмента на 1 см)

### Ограничения
1. Отсутствие тактильной обратной связи
2. Высокая стоимость системы и расходных материалов
3. Габариты системы
4. Длительность настройки (docking time)

## Клиническое применение

### Абдоминальная хирургия

#### Колоректальные операции
- Низкая передняя резекция прямой кишки
- Правосторонняя и левосторонняя гемиколэктомия
- Преимущества в узком мужском тазу

#### Верхний этаж брюшной полости
- Гастрэктомия с D2 лимфодиссекцией
- Резекция пищевода
- Панкреатодуоденальная резекция
- Резекция печени

### Результаты исследований

#### Краткосрочные результаты
- Меньшая конверсия в открытую операцию
- Сопоставимое операционное время после преодоления кривой обучения
- Аналогичная частота осложнений

#### Онкологические результаты
- Адекватный объем лимфодиссекции
- Частота R0-резекций не уступает другим методам
- Долгосрочная выживаемость сопоставима

## Кривая обучения

### Этапы освоения
1. Базовый тренинг (симулятор)
2. Ассистирование опытному хирургу (20-30 случаев)
3. Выполнение под супервизией (30-50 случаев)
4. Самостоятельная работа

### Факторы успеха
- Опыт в лапароскопии
- Регулярная практика
- Прохождение сертифицированных курсов
- Командная работа

## Экономические аспекты

### Стоимость
- Приобретение системы: $1-2.5 млн
- Сервисный контракт: $100-200 тыс./год
- Стоимость одноразовых инструментов: $2-3 тыс. на операцию

### Окупаемость
- Требуется высокий объем операций
- Возможность привлечения пациентов
- Сокращение сроков госпитализации

## Будущие направления

### Технологические инновации
1. Тактильная обратная связь (haptic feedback)
2. Флуоресцентная навигация (Firefly)
3. Интеграция с искусственным интеллектом
4. Уменьшение размеров системы (SP система)
5. Удаленная хирургия (telesurgery)

### Новые применения
- Трансоральная хирургия
- Трансанальная хирургия (TaTME)
- Микрохирургические вмешательства

### Конкуренция
Появление альтернативных роботических систем:
- Senhance (TransEnterix)
- Versius (CMR Surgical)
- Hugo (Medtronic)

## Заключение

Роботизированная хирургия прочно заняла свое место в арсенале современного хирурга. Несмотря на высокую стоимость, технология продолжает развиваться и становиться доступнее. Будущее за интеграцией роботических систем с AI, расширенной реальностью и другими инновационными технологиями.`,
      category: 'Технологии',
      publishedAt: new Date('2024-03-01'),
    },
    {
      title: 'ERAS протоколы в абдоминальной хирургии',
      excerpt: 'Enhanced Recovery After Surgery - современная концепция ускоренной реабилитации после операций.',
      content: `# ERAS протоколы в абдоминальной хирургии

## Введение

Enhanced Recovery After Surgery (ERAS) - мультимодальная периоперационная стратегия, направленная на быстрое восстановление пациента после операции с сохранением безопасности и снижением осложнений.

## Предоперационный период

### Информирование и подготовка пациента
- Детальное объяснение плана лечения
- Управление ожиданиями
- Психологическая подготовка

### Предоперационное голодание
**Традиционный подход:** 12 часов голода
**ERAS подход:**
- Твердая пища: за 6 часов до операции
- Прозрачные жидкости: за 2 часа до операции
- Возможно применение углеводной загрузки

### Отказ от рутинной механической подготовки кишечника
Исследования показали отсутствие преимуществ при плановых операциях.

## Интраоперационный период

### Анестезиологическое обеспечение
- Эпидуральная аналгезия (грудной уровень)
- Мультимодальная аналгезия
- Минимизация опиоидов

### Хирургическая техника
- Предпочтение малоинвазивных доступов
- Минимизация дренирования
- Отказ от рутинной установки назогастрального зонда

### Инфузионная терапия
- Goal-directed fluid therapy
- Избегание гипер- и гиповолемии
- Мониторинг волемического статуса

### Профилактика гипотермии
- Поддержание нормотермии (36-37°C)
- Согревающие системы
- Теплые инфузионные растворы

## Послеоперационный период

### Аналгезия
Мультимодальный подход:
- Эпидуральная аналгезия
- НПВС (при отсутствии противопоказаний)
- Парацетамол
- Местная инфильтрация ран
- TAP-блок

### Ранняя мобилизация
- День операции: сидеть в кресле 2-6 часов
- 1-й послеоперационный день: ходьба 4-6 часов
- Постепенное увеличение активности

### Раннее энтеральное питание
- Прозрачные жидкости в день операции
- Обычная пища с 1-го послеоперационного дня
- Отсутствие необходимости ждать восстановления перистальтики

### Профилактика тошноты и рвоты
Комбинация антиэметиков:
- Дексаметазон
- Ондансетрон
- Метоклопрамид

### Удаление катетеров и дренажей
- Мочевой катетер: удаление на 1-2 сутки
- Дренажи: раннее удаление при отсутствии показаний

## Критерии выписки

1. Адекватная аналгезия пероральными препаратами
2. Возможность самостоятельного питания
3. Восстановление функции кишечника
4. Самостоятельная мобилизация
5. Отсутствие осложнений, требующих стационарного лечения

## Результаты внедрения ERAS

### Клинические результаты
- Сокращение срока госпитализации на 30-50%
- Снижение общей частоты осложнений
- Более быстрое восстановление

### Экономический эффект
- Снижение стоимости лечения
- Уменьшение нагрузки на стационар
- Более быстрый возврат к повседневной активности

## Препятствия к внедрению

### Организационные
- Необходимость изменения устоявшихся практик
- Требуется координация между службами
- Обучение персонала

### Культурные
- Сопротивление изменениям
- Скептицизм части медицинского сообщества

## Заключение

ERAS - доказанная стратегия улучшения результатов хирургического лечения. Успешное внедрение требует командного подхода, обучения персонала и постоянного аудита соблюдения протокола.`,
      category: 'Периоперационное ведение',
      publishedAt: new Date('2024-03-15'),
    },
    {
      title: 'Техника лимфодиссекции D2 при раке желудка',
      excerpt: 'Детальное руководство по выполнению расширенной лимфодиссекции D2 при радикальных операциях по поводу рака желудка.',
      content: `# Техника лимфодиссекции D2 при раке желудка

## Введение

Лимфодиссекция D2 является стандартом хирургического лечения рака желудка. Правильное выполнение лимфодиссекции критически важно для радикальности операции и прогноза.

## Классификация лимфоузлов (Japanese Gastric Cancer Association)

### Группы лимфоузлов
**N1 (перигастральные):**
- Станция 1: правые паракардиальные
- Станция 2: левые паракардиальные
- Станция 3: малая кривизна
- Станция 4: большая кривизна
- Станция 5: супрапилорические
- Станция 6: инфрапилорические

**N2 (второго порядка):**
- Станция 7: левая желудочная артерия
- Станция 8: общая печеночная артерия
- Станция 9: чревный ствол
- Станция 10: ворота селезенки
- Станция 11: селезеночная артерия
- Станция 12: гепатодуоденальная связка

## Определение объема лимфодиссекции

### D1 лимфодиссекция
Удаление перигастральных лимфоузлов (N1).

### D1+ лимфодиссекция
D1 + станции 7, 8a, 9.

### D2 лимфодиссекция
D1 + все лимфоузлы N2.

## Техника выполнения D2 лимфодиссекции

### Этап 1: Станция 6 (инфрапилорические)
- Скелетизация правой желудочно-сальниковой артерии
- Удаление клетчатки между головкой поджелудочной и двенадцатиперстной кишкой

### Этап 2: Станция 5 (супрапилорические)
- Лимфодиссекция вдоль правой желудочной артерии
- Связана с диссекцией станции 12

### Этап 3: Станция 12 (гепатодуоденальная связка)
- Скелетизация собственной печеночной артерии
- Удаление клетчатки вдоль общего желчного протока
- Осторожность: правая печеночная артерия, холедох

### Этап 4: Станция 8a (общая печеночная артерия)
- Диссекция вдоль общей печеночной артерии
- От устья гастродуоденальной артерии до чревного ствола

### Этап 5: Станция 9 (чревный ствол)
- Циркулярная диссекция вокруг чревного ствола
- Удаление клетчатки с обнажением аорты

### Этап 6: Станция 7 (левая желудочная артерия)
- Скелетизация левой желудочной артерии от устья до желудка
- Лигирование и пересечение у устья

### Этап 7: Станции 10, 11 (селезеночные)
- Диссекция ворот селезенки
- Диссекция вдоль селезеночной артерии
- При дистальной резекции можно сохранить селезенку

### Этап 8: Станции 1, 2 (паракардиальные)
- Диссекция в кардиоэзофагеальной зоне
- При тотальной гастрэктомии включает нижнюю треть пищевода

### Этап 9: Станции 3, 4 (кривизны желудка)
- Завершающий этап скелетизации желудка

## Спленэктомия при D2

### Показания к сохранению селезенки
- Опухоли нижней и средней трети желудка без поражения большой кривизны
- Технически возможна диссекция станций 10, 11 с сохранением селезенки

### Показания к спленэктомии
- Опухоли верхней трети с инвазией большой кривизны
- Технические сложности при сохранении селезенки

## Осложнения лимфодиссекции D2

### Интраоперационные
- Кровотечение из селезеночных сосудов
- Повреждение поджелудочной железы
- Повреждение холедоха

### Послеоперационные
- Послеоперационный панкреатит/панкреатическая фистула
- Абсцессы брюшной полости
- Инфекция операционной раны

## Профилактика осложнений

1. Прецизионная диссекция с минимальной травматизацией поджелудочной
2. Адекватный гемостаз
3. Бережное обращение с желчными протоками
4. Использование энергетических устройств

## Онкологические результаты

Исследования показали:
- Лимфодиссекция D2 ассоциирована с лучшей выживаемостью по сравнению с D1
- Снижение частоты местных рецидивов
- Важность выполнения в специализированных центрах

## Заключение

Качественное выполнение D2 лимфодиссекции требует отличного знания анатомии, опыта и терпения. Это золотой стандарт хирургического лечения рака желудка в современной онкохирургии.`,
      category: 'Онкохирургия',
      publishedAt: new Date('2024-04-01'),
    },
    {
      title: 'Управление послеоперационным болевым синдромом',
      excerpt: 'Современные подходы к аналгезии в абдоминальной хирургии.',
      content: `# Управление послеоперационным болевым синдромом

## Введение

Адекватная послеоперационная аналгезия - ключевой компонент успешного восстановления пациента. Неконтролируемая боль приводит к осложнениям и замедляет реабилитацию.

## Негативные последствия неадекватной аналгезии

### Респираторные осложнения
- Поверхностное дыхание
- Нарушение откашливания
- Ателектазы
- Пневмония

### Сердечно-сосудистые
- Тахикардия
- Гипертензия
- Повышенная нагрузка на миокард

### Желудочно-кишечные
- Парез кишечника
- Задержка восстановления перистальтики

### Психологические
- Тревога
- Нарушения сна
- Делирий

## Мультимодальная аналгезия

Концепция использования различных препаратов и методик для синергетического эффекта при меньших дозах каждого компонента.

### Компоненты

#### 1. Регионарная анестезия
**Эпидуральная аналгезия**
- Золотой стандарт при больших абдоминальных операциях
- Грудной уровень (Th6-Th10)
- Комбинация местного анестетика + опиоид
- Продолжительность: 2-3 суток

**Блокады периферических нервов**
- TAP-блок (transversus abdominis plane)
- Блокада прямых мышц живота
- Однократное введение или установка катетера

#### 2. Системные анальгетики

**Парацетамол**
- Базовый компонент
- 1 г каждые 6 часов
- Безопасен при нормальной функции печени

**НПВС**
- Кеторолак 30 мг каждые 8 часов
- Парекоксиб 40 мг каждые 12 часов
- Внимание: риск кровотечения, нарушение функции почек

**Опиоиды**
- Морфин, фентанил, оксикодон
- Предпочтительно - PCA (patient-controlled analgesia)
- Минимизация доз при мультимодальном подходе

#### 3. Адъювантная терапия

**Габапентиноиды**
- Прегабалин 75-150 мг перед операцией
- Снижает послеоперационную боль и потребность в опиоидах

**Кетамин**
- Субанестетические дозы (0.1-0.5 мг/кг/ч)
- Особенно эффективен при опиоид-толерантных пациентах

**Дексмедетомидин**
- α2-агонист
- Аналгезия + седация без респираторной депрессии

## Оценка боли

### Числовая шкала (NRS 0-10)
- 0 = нет боли
- 1-3 = легкая боль
- 4-6 = умеренная боль
- 7-10 = сильная боль

### Цели терапии
- Боль в покое NRS ≤ 3
- Боль при движении NRS ≤ 5

## Особые ситуации

### Лапароскопические операции
- Меньший болевой синдром
- Больше плечевой боли (CO2)
- Достаточно системной аналгезии

### Пожилые пациенты
- Осторожность с опиоидами (риск делирия)
- Снижение доз
- Регионарная анестезия предпочтительна

### Пациенты с хронической болью
- Продолжение базовой терапии
- Более высокие потребности в аналгетиках
- Мультидисциплинарный подход

## Схемы аналгезии

### После больших открытых операций
1. Эпидуральная аналгезия (ропивакаин + фентанил) 48-72 ч
2. Парацетамол 1 г x 4
3. Кеторолак 30 мг x 3
4. Морфин PCA как rescue

### После лапароскопии
1. Парацетамол 1 г x 4
2. НПВС
3. Опиоиды короткого действия по требованию
4. Возможен TAP-блок

## Побочные эффекты и их коррекция

### Опиоиды
- Тошнота/рвота → антиэметики
- Запор → слабительные с 1-го дня
- Зуд → антигистаминные
- Седация → снижение дозы

### НПВС
- Мониторинг функции почек
- Осторожность при язвенной болезни
- Контроль кровопотери при дренажах

## Заключение

Эффективная послеоперационная аналгезия требует:
- Проактивного подхода (по часам, не по требованию)
- Мультимодальной стратегии
- Регулярной оценки боли
- Индивидуализации терапии
- Командной работы анестезиологов и хирургов`,
      category: 'Периоперационное ведение',
      publishedAt: new Date('2024-04-15'),
    },
    {
      title: 'Нутритивная поддержка хирургических пациентов',
      excerpt: 'Принципы предоперационной подготовки и послеоперационного питания пациентов в абдоминальной хирургии.',
      content: `# Нутритивная поддержка хирургических пациентов

## Введение

Нутритивный статус напрямую влияет на исходы хирургического лечения. Недостаточность питания увеличивает риск осложнений, замедляет заживление и ухудшает прогноз.

## Оценка нутритивного статуса

### Скрининговые инструменты
- NRS-2002 (Nutritional Risk Screening)
- MUST (Malnutrition Universal Screening Tool)
- SGA (Subjective Global Assessment)

### Критерии недостаточности питания
- Потеря массы тела >10% за 6 месяцев
- ИМТ <18.5 кг/м²
- Альбумин <30 г/л
- Лимфопения <1500/мкл

## Предоперационная подготовка

### Углеводная загрузка
**Цель:** снижение инсулинорезистентности и катаболизма
- За 12-14 часов: 100 г углеводов
- За 2 часа: 50 г углеводов
- Противопоказания: сахарный диабет с нарушением контроля

### Иммунопитание
Обогащенные смеси (аргинин, ω-3 ПНЖК, нуклеотиды):
- 5-7 дней перед большими онкологическими операциями
- Снижение инфекционных осложнений

### Коррекция дефицитов
- Белок: 1.2-1.5 г/кг/сут
- Витамины и микроэлементы
- Коррекция анемии

## Послеоперационное питание

### Принципы ERAS

**Раннее начало**
- Прозрачные жидкости в день операции
- Обычное питание с 1-го послеоперационного дня
- Не требуется ждать "восстановления перистальтики"

**Пероральный путь - приоритет**
Последовательность выбора:
1. Обычное питание
2. Обогащенное питание (sip feeds)
3. Энтеральное зондовое питание
4. Парентеральное питание (крайняя мера)

### Показания к зондовому питанию

**Энтеральное**
- Невозможность перорального питания >7 дней
- Покрытие <60% потребностей пероральным путем
- Нарушения глотания

**Типы зондов**
- Назогастральный/назоеюнальный
- Гастростома/еюностома

### Парентеральное питание

**Показания**
- Невозможность/непереносимость энтерального питания
- Кишечная недостаточность
- Высокий кишечный свищ

**Состав**
- Аминокислоты: 1.2-1.5 г/кг/сут
- Глюкоза + жировые эмульсии
- Электролиты, витамины, микроэлементы

**Осложнения**
- Инфекция катетера
- Гипергликемия
- Холестаз

## Специфические ситуации

### Онкологические пациенты

**Кахексия**
- Часто встречается при опухолях ЖКТ
- Мультимодальный подход: питание + физическая активность + ?медикаменты

**Периоперационная поддержка**
- Иммунопитание 5-7 дней предоперационно
- Агрессивная нутритивная поддержка после операции

### Пациенты с ожирением

**Парадокс ожирения**
- Могут иметь белково-энергетическую недостаточность
- "Саркопеническое ожирение"

**Расчет питания**
- Использование скорректированной массы тела
- Избегать гиперкалорийности

### Пожилые пациенты

**Особенности**
- Часто недостаточное питание до операции
- Саркопения
- Нарушение аппетита

**Стратегии**
- Раннее выявление недостаточности питания
- Обогащенное питание
- Белок 1.2-1.5 г/кг/сут

## Мониторинг нутритивной поддержки

### Клинические показатели
- Масса тела
- Объем и калораж питания
- Толерантность к питанию

### Лабораторные
- Альбумин (ограниченная ценность в остром периоде)
- Преальбумин
- С-реактивный белок
- Электролиты, глюкоза

## Осложнения энтерального питания

### Гастроинтестинальные
- Диарея
- Вздутие, дискомфорт
- Тошнота, рвота

**Коррекция**
- Снижение скорости введения
- Разделение дозы
- Изменение формулы

### Аспирация
**Профилактика**
- Положение 30-45°
- Контроль остаточных объемов
- Постпилорическое питание

## Заключение

Оптимальная нутритивная поддержка:
- Начинается с предоперационного скрининга
- Приоритет раннего энтерального питания
- Парентеральное питание - при невозможности энтерального
- Индивидуализация в зависимости от типа операции и пациента
- Мультидисциплинарный подход`,
      category: 'Периоперационное ведение',
      publishedAt: new Date('2024-05-01'),
    },
    {
      title: 'Профилактика венозных тромбоэмболических осложнений',
      excerpt: 'Современные протоколы профилактики ВТЭО у хирургических пациентов.',
      content: `# Профилактика венозных тромбоэмболических осложнений

## Введение

Венозные тромбоэмболические осложнения (ВТЭО) - тромбоз глубоких вен (ТГВ) и тромбоэмболия легочной артерии (ТЭЛА) - серьезная проблема в хирургии с потенциально фатальными последствиями.

## Эпидемиология

### Частота без профилактики
- После общехирургических операций: 15-30%
- После онкологических операций: 20-40%
- Симптоматический ТГВ: 2-3%
- ТЭЛА: 0.5-2%
- Фатальная ТЭЛА: 0.2-0.5%

### Факторы риска

**Связанные с пациентом:**
- Возраст >40 лет
- Ожирение (ИМТ >30)
- Онкологическое заболевание
- Предшествующие ВТЭО
- Тромбофилии
- Прием гормональных препаратов
- Варикозная болезнь
- Беременность/послеродовой период

**Связанные с операцией:**
- Длительность >45 минут
- Большой объем вмешательства
- Лапаротомия vs лапароскопия
- Экстренная операция
- Длительная иммобилизация

## Оценка риска

### Шкала Caprini

Стратификация риска с учетом множественных факторов (возраст, ИМТ, тип операции, сопутствующие заболевания):

- 0-1 балл: очень низкий риск
- 2 балла: низкий риск
- 3-4 балла: умеренный риск
- ≥5 баллов: высокий риск

## Методы профилактики

### Механические методы

**Ранняя активизация**
- Начинать в день операции
- Ходьба минимум 4-6 часов в 1-е сутки

**Градуированный компрессионный трикотаж**
- Компрессионные чулки
- Давление 15-20 мм рт.ст.
- Надевать до операции

**Пневмокомпрессия**
- Перемежающаяся пневматическая компрессия голеней
- Использование интра- и послеоперационно
- Особенно при высоком риске кровотечения

### Фармакологическая профилактика

**Низкомолекулярные гепарины (НМГ)**

*Эноксапарин:*
- Умеренный риск: 20 мг подкожно 1 раз/сут
- Высокий риск: 40 мг подкожно 1 раз/сут

*Надропарин:*
- 0.3 мл (2850 МЕ) 1 раз/сут

**Нефракционированный гепарин (НФГ)**
- 5000 ЕД подкожно каждые 8-12 часов
- Меньше предпочтителен, чем НМГ

**Новые пероральные антикоагулянты (НОАК)**

*Ривароксабан:*
- 10 мг 1 раз/сут перорально
- Начало через 6-10 часов после операции

### Время начала профилактики

**Предоперационно:**
- НМГ: за 12 часов до операции
- Или за 2 часа до операции (половинная доза)

**Послеоперационно:**
- Не ранее 6-12 часов после операции
- При адекватном гемостазе

## Протоколы в зависимости от риска

### Низкий риск (Caprini 1-2)
- Ранняя активизация
- Компрессионный трикотаж

### Умеренный риск (Caprini 3-4)
- Ранняя активизация
- НМГ в стандартной дозе
- ИЛИ механические методы при высоком риске кровотечения

### Высокий риск (Caprini ≥5)
- Ранняя активизация
- НМГ в высокой дозе
- + Механические методы (пневмокомпрессия)

### Онкологические операции
- Расширенная профилактика: 28 дней после операции
- НМГ или НОАК

## Длительность профилактики

**Стандартная:**
- До полной активизации
- Минимум 7-10 дней

**Расширенная (28 дней):**
- Онкологические операции
- Высокий риск ВТЭО

## Противопоказания к антикоагулянтам

### Абсолютные
- Активное кровотечение
- Тяжелая коагулопатия
- Нейроаксиальная анестезия (временное противопоказание)

### Относительные
- Недавнее кровотечение
- Тромбоцитопения <50 × 10⁹/л
- Тяжелая почечная недостаточность

## Особые ситуации

### Нейроаксиальная анестезия

**Эпидуральная/спинальная анестезия:**
- Интервал 10-12 часов между последней дозой НМГ и пункцией
- Интервал 4 часа между удалением катетера и введением НМГ
- Риск эпидуральной гематомы

### Почечная недостаточность
- Снижение дозы НМГ
- Или переход на НФГ

### Ожирение
- Возможно увеличение дозы НМГ
- Мониторинг анти-Ха активности

## Мониторинг эффективности

### Клинические признаки ТГВ
- Боль, отек голени
- Симптом Хоманса

### УЗИ вен нижних конечностей
- При подозрении на ТГВ
- Рутинный скрининг не рекомендуется

## Лечение установленного ВТЭО

При развитии симптоматического ТГВ/ТЭЛА:
- Переход на лечебные дозы антикоагулянтов
- Консультация сосудистого хирурга/пульмонолога

## Заключение

Профилактика ВТЭО:
- Обязательна у всех хирургических пациентов
- Основана на стратификации риска
- Комбинация механических и фармакологических методов
- Продолжение до полной активизации
- Расширенная профилактика при онкологических операциях`,
      category: 'Периоперационное ведение',
      publishedAt: new Date('2024-05-15'),
    },
    {
      title: 'Минимально инвазивная резекция печени',
      excerpt: 'Современные подходы к лапароскопической и роботизированной резекции печени.',
      content: `# Минимально инвазивная резекция печени

## Введение

Минимально инвазивная резекция печени (МИРП) - лапароскопическая или роботизированная - активно развивается в последние два десятилетия. Изначально применялась для небольших периферических резекций, сегодня включает и большие анатомические резекции.

## Классификация сложности (Louisville Statement, 2008)

### По локализации
**Благоприятные (передне-латеральные) сегменты:**
- Сегменты 2, 3, 4b, 5, 6
- Легко доступны

**Сложные (постеро-верхние) сегменты:**
- Сегменты 1, 4a, 7, 8
- Близость к крупным сосудам, диафрагме

### По объему резекции
1. Малые резекции (<3 сегментов)
2. Большие резекции (≥3 сегментов, гемигепатэктомии)

### Уровни сложности
- Уровень 1: простые периферические резекции
- Уровень 2: умеренно сложные
- Уровень 3: высокая сложность (постеро-верхние, большие резекции)

## Показания

### Онкологические
- Гепатоцеллюлярный рак
- Метастазы колоректального рака
- Холангиокарцинома (периферическая)
- Метастазы других опухолей

### Доброкачественные
- Аденома печени
- ФНГ (фокальная нодулярная гиперплазия)
- Гемангиомы (при симптоматике)
- Кисты печени

## Противопоказания

### Абсолютные
- Невозможность пневмоперитонеума
- Тяжелая портальная гипертензия
- Некорригируемая коагулопатия

### Относительные
- Опухоли >10 см
- Множественные опухоли
- Выраженный цирроз (Child-Pugh B-C)
- Предшествующие операции на печени

## Техника лапароскопической резекции

### Позиционирование
- Положение Французское (между ног хирурга)
- Или положение на правом боку

### Доступ
- 4-5 портов
- Возможна рука-ассистенция (HALS)

### Этапы операции

**1. Ревизия**
- Интраоперационное УЗИ (обязательно!)
- Оценка резектабельности
- Исключение дополнительных очагов

**2. Мобилизация печени**
- Пересечение связок
- Мобилизация правой доли (при гемигепатэктомии)

**3. Паренхиматозная диссекция**

*Методы:*
- CUSA (ультразвуковая аспирация)
- Водоструйная диссекция
- Гармонический скальпель
- LigaSure

*Контроль сосудов:*
- Клипирование
- Степлеры
- Лигирование

**4. Гемостаз**
- Биполярная коагуляция
- Гемостатические материалы
- Аргоноплазменная коагуляция

**5. Экстракция препарата**
- Контейнер для морцелляции
- Или расширение порта

### Особенности больших резекций

**Гемигепатэктомия:**
- Предварительный контроль сосудистой ножки
- Возможна внепеченочная техника (сначала сосуды, потом паренхима)

**Техника Pringle маневра:**
- Пережатие печеночно-двенадцатиперстной связки
- 15-20 минут компрессии, 5 минут реперфузии
- Снижение кровопотери

## Роботизированная резекция печени

### Преимущества над лапароскопией
- Трехмерное изображение
- Инструменты Endowrist
- Устранение тремора
- Эргономика

### Особенности
- Более длительное время настройки (docking)
- Выше стоимость
- Преимущества при резекциях сложной локализации

## Результаты

### Преимущества МИРП vs открытая резекция

**Краткосрочные:**
- Меньшая кровопотеря
- Меньше послеоперационной боли
- Короче госпитализация (5-6 vs 8-10 дней)
- Быстрее восстановление
- Меньше раневых осложнений

**Онкологические:**
- Сопоставимые R0-резекции
- Не уступающая выживаемость
- Аналогичная частота рецидивов

### Недостатки
- Длительная кривая обучения (50-60 случаев)
- Технические сложности
- Риск массивного кровотечения
- Ограничения при больших опухолях

## Осложнения

### Интраоперационные
- Кровотечение (наиболее частое, 5-10%)
- Конверсия в открытую операцию (3-5%)
- Воздушная эмболия (редко)

### Послеоперационные
- Желчеистечение (5-10%)
- Билиома
- Печеночная недостаточность (при малом остатке печени)
- Абсцесс печени

### Конверсия
**Причины:**
- Неконтролируемое кровотечение
- Технические сложности
- Анатомические особенности

## Подготовка печени

### У пациентов с малым остатком
- Эмболизация воротной вены (ПВЭ)
- ALPPS процедура (редко)

### У пациентов с циррозом
- Оценка функции (ICG clearance)
- Минимизация объема резекции
- Парциальная резекция vs анатомическая

## Будущие направления

### Технологии
- Флуоресцентная навигация (ICG)
- Виртуальная/дополненная реальность
- 3D-планирование

### Расширение показаний
- Большие и сложные резекции
- Резекции при циррозе
- Повторные резекции

## Заключение

МИРП прочно вошла в арсенал гепатобилиарных хирургов. Соблюдение онкологических принципов и тщательная селекция пациентов обеспечивают безопасность и хорошие результаты. Будущее за дальнейшим расширением показаний и внедрением новых технологий.`,
      category: 'Хирургическая техника',
      publishedAt: new Date('2024-06-01'),
    },
    {
      title: 'Современные техники реконструкции при гастрэктомии',
      excerpt: 'Обзор методов восстановления непрерывности ЖКТ после удаления желудка.',
      content: `# Современные техники реконструкции при гастрэктомии

## Введение

Выбор метода реконструкции после тотальной гастрэктомии влияет на качество жизни пациента. Цели реконструкции: восстановление непрерывности ЖКТ, профилактика рефлюкс-эзофагита, создание резервуара.

## Типы реконструкции

### 1. Эзофагоеюностомия по Ру (Roux-en-Y)

**Золотой стандарт реконструкции**

#### Техника
- Пересечение тощей кишки на 20-30 см от трейцевой связки
- Проведение дистального конца в ретроколическом туннеле
- Пищеводно-кишечный анастомоз (ПКА) конец-в-бок
- Еюноеюноанастомоз на расстоянии 40-60 см от ПКА

#### Преимущества
- Низкий риск рефлюкс-эзофагита
- Техническая простота
- Предсказуемые результаты

#### Недостатки
- Отсутствие резервуара
- Синдром Ру (нарушение моторики отключенной петли)
- Недостаточное питание у части пациентов

### 2. Интерпозиция тощей кишки (Jejunal Interposition)

#### Техника
- Выделение сегмента тощей кишки 15-20 см на сосудистой ножке
- Проведение в ретроколическом туннеле
- Проксимальный анастомоз с пищеводом
- Дистальный анастомоз с тощей кишкой
- Еюноеюноанастомоз

#### Преимущества
- Создание резервуара
- Более физиологичная моторика
- Лучшие нутритивные результаты

#### Недостатки
- Техническая сложность
- Три анастомоза (выше риск несостоятельности)
- Риск ишемии интерпонированного сегмента

### 3. Реконструкция с формированием тощекишечного резервуара (Pouch)

Несколько вариантов:
- J-образный резервуар (Hunt-Lawrence pouch)
- P-образный резервуар
- Двойной тракт (double-tract)

#### Техника J-pouch
- Формирование J-образной петли из 10-12 см тощей кишки
- Боковая энтеротомия
- ПКА конец-в-бок к энтеротомии
- Закрытие энтеротомии, формирование резервуара

#### Преимущества
- Создание резервуара 60-80 мл
- Улучшение нутритивного статуса
- Лучшее качество жизни

#### Недостатки
- Техническая сложность
- Возможен застой в резервуаре
- Не всегда возможно при коротком пищеводе

### 4. Реконструкция "двойной тракт" (Double Tract)

#### Техника
- Эзофагоеюноанастомоз по Ру
- Дополнительный гастроеюноанастомоз (дуоденоеюноанастомоз) ниже ПКА
- Пища проходит по обоим путям

#### Преимущества
- Улучшенное питание (пища проходит через двенадцатиперстную кишку)
- Меньше дефицит витамина B12, железа
- Лучшая прибавка веса

#### Недостатки
- Более сложная техника
- Теоретический риск рефлюкса

## Техника анастомозов

### Пищеводно-кишечный анастомоз

#### Ручной шов
- Однорядный vs двухрядный
- Рассасывающаяся нить 3-0 или 4-0
- Обвивной шов или узловые швы

#### Степлерный анастомоз
- Циркулярный степлер 25 мм
- Трансоральное или трансабдоминальное введение
- Проверка "пончика"

#### Сравнение
- Степлеры: быстрее, стандартизированы
- Ручной шов: лучше при коротком пищеводе, меньше стриктур

### Еюноеюноанастомоз
- Обычно ручной шов
- Однорядный анастомоз конец-в-бок или бок-в-бок
- Или линейный степлер

## Профилактика несостоятельности анастомозов

### Факторы риска
- Натяжение анастомоза
- Нарушение кровоснабжения
- Технические погрешности
- Общие факторы (гипопротеинемия, анемия, сахарный диабет)

### Меры профилактики
- Адекватная мобилизация пищевода и кишки
- Проверка кровоснабжения (цвет, пульсация, ICG флуоресценция)
- Отсутствие натяжения
- Проверка проходимости анастомоза
- Назоеюнальный зонд для раннего питания

## Осложнения

### Несостоятельность анастомоза (5-10%)
**Ранняя:**
- Признаки перитонита, сепсиса
- КТ с контрастом
- Лечение: реоперация + дренирование, или консервативно при отграниченной несостоятельности

**Поздняя:**
- Стриктура анастомоза
- Лечение: эндоскопическая дилатация, стентирование

### Рефлюкс-эзофагит
- Чаще при реконструкции без резервуара
- Лечение: ИПП, прокинетики

### Синдром Ру
- Тошнота, рвота, боли в животе
- Нарушение моторики отключенной петли
- Лечение: консервативное (прокинетики), редко хирургическое

### Нутритивные осложнения
- Дефицит B12, железа, кальция
- Потеря веса
- Профилактика: добавки, мониторинг

## Отдаленные функциональные результаты

### Качество жизни
Исследования показывают:
- Резервуарная реконструкция → лучшее качество жизни
- Меньше демпинг-синдрома
- Лучшая прибавка веса

### Нутритивный статус
- Double tract → лучшие показатели (меньше дефицитов)
- Резервуары → больший объем приема пищи за раз

## Выбор метода реконструкции

Факторы выбора:
- Длина остаточного пищевода
- Общее состояние пациента
- Технические возможности хирурга
- Прогноз заболевания

**Рекомендации:**
- Стандарт: Roux-en-Y (баланс простоты и результатов)
- При хорошем прогнозе: резервуарная реконструкция
- При техническом опыте: double tract или интерпозиция

## Заключение

Выбор метода реконструкции после гастрэктомии должен быть индивидуализирован. Резервуарные методы улучшают качество жизни, но технически сложнее. Профилактика несостоятельности анастомоза - ключевой момент в достижении хороших результатов.`,
      category: 'Хирургическая техника',
      publishedAt: new Date('2024-06-15'),
    },
    {
      title: 'Управление периоперационным риском у пожилых пациентов',
      excerpt: 'Особенности хирургического лечения пациентов старшей возрастной группы.',
      content: `# Управление периоперационным риском у пожилых пациентов

## Введение

Доля пожилых пациентов в хирургической практике постоянно растет. Пациенты >65 лет составляют до 50% всех хирургических вмешательств. Периоперационные риски существенно выше в этой группе.

## Возрастные изменения

### Сердечно-сосудистая система
- Снижение сердечного резерва
- Жесткость сосудов
- Нарушения проводимости
- Частая ИБС, АГ, ХСН

### Респираторная система
- Снижение жизненной емкости легких
- Нарушение газообмена
- Снижение кашлевого рефлекса
- Высокий риск аспирации

### Почки
- Снижение СКФ
- Нарушение концентрационной функции
- Склонность к задержке жидкости

### ЦНС
- Снижение когнитивных функций
- Высокий риск делирия
- Нарушения сна

### Питание
- Саркопения (потеря мышечной массы)
- Часто недостаточное питание
- Снижение альбумина

### Иммунная система
- Иммуносенесценция
- Высокий риск инфекций

## Предоперационная оценка

### Комплексная гериатрическая оценка (CGA)

**Функциональный статус:**
- ADL (Activities of Daily Living)
- IADL (Instrumental ADL)
- Тест ходьбы 6 минут

**Когнитивная функция:**
- MMSE (Mini-Mental State Examination)
- MoCA (Montreal Cognitive Assessment)

**Нутритивный статус:**
- MNA (Mini Nutritional Assessment)
- Альбумин, преальбумин

**Коморбидность:**
- Индекс Charlson
- ASA класс

### Оценка хирургического риска

**Шкалы:**
- P-POSSUM (Physiological and Operative Severity Score)
- ACS NSQIP Risk Calculator
- Cardiac Risk Index (Goldman, Revised Lee)

**Хрупкость (Frailty):**
- Fried Frailty Phenotype
- Edmonton Frail Scale

Хрупкие пациенты имеют значительно выше риск осложнений и летальности.

## Предоперационная оптимизация

### Prehabilitation
Комплексная программа перед операцией:
- Физические упражнения (аэробные + силовые)
- Нутритивная поддержка
- Психологическая подготовка
- Длительность: 3-4 недели

**Результаты:**
- Снижение осложнений на 30-50%
- Короче срок госпитализации
- Лучше функциональное восстановление

### Оптимизация сопутствующих заболеваний

**Сердечно-сосудистые:**
- Контроль АД (целевое 130-140/80 мм рт.ст.)
- Оптимизация терапии ХСН
- Коррекция антикоагулянтов

**Респираторные:**
- Прекращение курения (минимум 4 недели)
- Бронходилататоры при ХОБЛ
- Дыхательная гимнастика

**Диабет:**
- Контроль гликемии (HbA1c <7-8%)
- Коррекция схемы терапии

**Почечная функция:**
- Оценка СКФ
- Коррекция доз препаратов
- Гидратация

### Нутритивная поддержка
- Белок 1.2-1.5 г/кг/сут
- Коррекция дефицитов (железо, B12, витамин D)
- Иммунопитание перед большими операциями

### Когнитивная подготовка
- Объяснение плана лечения
- Управление ожиданиями
- Вовлечение родственников

## Интраоперационное ведение

### Анестезия

**Выбор метода:**
- Общая vs регионарная (по показаниям)
- Регионарная анестезия может снижать делирий

**Мониторинг:**
- Расширенный гемодинамический мониторинг
- Контроль глубины анестезии (BIS)

**Особенности:**
- Снижение доз анестетиков
- Осторожность с бензодиазепинами
- Мультимодальная аналгезия

### Инфузионная терапия
- Goal-directed fluid therapy
- Избегать гипер- и гиповолемии
- Мониторинг волемического статуса (SVV, PPV)

### Профилактика гипотермии
- Поддержание нормотермии критически важно
- Активное согревание

### Хирургическая техника
- Минимизация травматичности
- Предпочтение малоинвазивных доступов
- Сокращение времени операции (когда возможно)

## Послеоперационное ведение

### Профилактика делирия

**Факторы риска:**
- Возраст >70 лет
- Предсуществующие когнитивные нарушения
- Боль
- Инфекция
- Гипоксия
- Дегидратация
- Опиоиды, бензодиазепины

**Профилактика:**
- Ориентация пациента (часы, календарь, окно)
- Очки, слуховые аппараты
- Адекватная аналгезия
- Минимизация опиоидов
- Ранняя активизация
- Нормализация сна
- Избегать физических ограничений (катетеры и т.д.)

### Аналгезия
- Мультимодальный подход
- Регионарная анестезия (эпидуральная)
- Минимизация опиоидов
- Регулярная оценка боли

### Ранняя активизация и питание
- Ходьба с 1-го послеоперационного дня
- Раннее энтеральное питание
- Протокол ERAS

### Профилактика осложнений

**Респираторные:**
- Дыхательная гимнастика
- Инсентивная спирометрия
- Ранняя активизация

**ВТЭО:**
- Фармакологическая профилактика
- Механические методы
- Ранняя активизация

**Инфекционные:**
- Антибиотикопрофилактика
- Контроль гликемии
- Удаление катетеров ASAP

### Мониторинг нутритивного статуса
- Обогащенное питание
- Белок 1.2-1.5 г/кг/сут
- Добавки при необходимости

## Послеоперационные осложнения

### Делирий (15-50%)
**Лечение:**
- Устранение причин
- Переориентация
- Галоперидол при возбуждении (с осторожностью)

### Пневмония
- Более частая и тяжелая
- Профилактика важнее лечения

### Острая почечная недостаточность
- Контроль волемии
- Избегать нефротоксичных препаратов

### Сердечно-сосудистые осложнения
- ИМ, ОСН, аритмии
- Требуют быстрой диагностики и лечения

## Этические аспекты

### Информированное согласие
- Реалистичное обсуждение рисков
- Вовлечение семьи
- Предварительные распоряжения

### Паллиативная помощь
- У части пациентов операция может не быть в лучших интересах
- Обсуждение альтернатив

## Заключение

Успешное хирургическое лечение пожилых пациентов требует:
- Тщательной предоперационной оценки
- Преабилитации при возможности
- Оптимизации сопутствующих заболеваний
- Минимально инвазивных подходов
- Интенсивной послеоперационной реабилитации
- Мультидисциплинарного подхода

Возраст сам по себе не должен быть противопоказанием к операции, но требует особого внимания к периоперационным рискам.`,
      category: 'Периоперационное ведение',
      publishedAt: new Date('2024-07-01'),
    },
    {
      title: 'Экстренная абдоминальная хирургия: принципы и тактика',
      excerpt: 'Подходы к диагностике и лечению острых хирургических заболеваний органов брюшной полости.',
      content: `# Экстренная абдоминальная хирургия: принципы и тактика

## Введение

Экстренная абдоминальная хирургия - область высокого риска с значительной летальностью (5-15%). Быстрая диагностика, своевременное хирургическое вмешательство и интенсивная терапия критически важны.

## Синдром "острого живота"

### Определение
Клинический симптомокомплекс, требующий экстренной госпитализации для исключения/подтверждения острого хирургического заболевания.

### Основные причины

**Воспалительные:**
- Острый аппендицит
- Острый холецистит
- Острый панкреатит
- Дивертикулит
- Перфорация полого органа

**Обструктивные:**
- Кишечная непроходимость (спаечная, опухолевая, инвагинация, заворот)
- Острая толстокишечная непроходимость

**Сосудистые:**
- Острая мезентериальная ишемия
- Разрыв аневризмы брюшной аорты
- Ишемия кишки при странгуляции

**Травматические:**
- Повреждения паренхиматозных органов
- Разрыв полых органов

## Диагностический подход

### Клиническая оценка

**Анамнез:**
- Начало (острое vs постепенное)
- Характер боли
- Локализация и иррадиация
- Провоцирующие факторы
- Сопутствующие симптомы (рвота, задержка стула и газов)

**Физикальное обследование:**
- Общее состояние
- Живот (осмотр, пальпация, перкуссия, аускультация)
- Симптомы раздражения брюшины
- Ректальное исследование

### Лабораторные исследования

**Обязательные:**
- ОАК (лейкоцитоз, сдвиг формулы)
- Биохимия (амилаза, липаза, печеночные ферменты, лактат)
- Коагулограмма
- Группа крови

**Дополнительные:**
- Прокальцитонин (сепсис)
- Тропонин (у пожилых)
- Газы крови, лактат (при тяжелом состоянии)

### Инструментальная диагностика

**Рентгенография:**
- Обзорная рентгенография брюшной полости (свободный газ, уровни жидкости)
- Рентгенография грудной клетки (пневмония, плеврит)

**УЗИ:**
- FAST (при травме)
- Оценка желчного пузыря, аппендикса
- Свободная жидкость в брюшной полости

**КТ брюшной полости с контрастом:**
- "Золотой стандарт" диагностики
- Чувствительность >95% для большинства патологий
- Помогает в планировании операции

**Диагностическая лапароскопия:**
- При неясной клинической картине
- Возможность перехода в лечебную

## Основные неотложные состояния

### Острый аппендицит

**Клиника:**
- Боль в правой подвздошной области
- Симптом Щеткина-Блюмберга
- Лихорадка, лейкоцитоз

**Диагностика:**
- КТ (чувствительность 95%)
- УЗИ (оператор-зависимо)
- Шкала Alvarado

**Лечение:**
- Аппендэктомия (лапароскопическая предпочтительно)
- Антибиотики
- При инфильтрате: консервативно → интервальная аппендэктомия

### Острый холецистит

**Клиника:**
- Боль в правом подреберье
- Положительный симптом Мерфи
- Лихорадка

**Диагностика:**
- УЗИ (утолщение стенки >4 мм, перивезикальная жидкость)
- КТ (при осложненных формах)
- Токийские критерии

**Лечение:**
- Ранняя холецистэктомия (в первые 72 ч) предпочтительна
- Антибиотики
- При высоком риске: холецистостомия

### Перфорация полого органа

**Причины:**
- Язва желудка/ДПК
- Перфорация дивертикула
- Перфорация опухоли
- Ятрогенная

**Клиника:**
- Внезапная "кинжальная" боль
- Доскообразный живот
- Перитонит

**Диагностика:**
- Рентгенография (свободный газ под диафрагмой)
- КТ (высокая чувствительность)

**Лечение:**
- Экстренная операция
- Ушивание перфорации ± резекция
- Санация и дренирование брюшной полости
- Антибиотики

### Острая кишечная непроходимость

**Классификация:**
- Механическая (обтурационная, странгуляционная, смешанная)
- Динамическая (паралитическая, спастическая)

**Клиника:**
- Боль
- Вздутие
- Рвота
- Задержка стула и газов

**Диагностика:**
- Рентгенография (чаши Клойбера, уровни жидкости)
- КТ (уровень и причина обструкции)

**Лечение:**
**Консервативное (при тонкокишечной непроходимости без странгуляции):**
- Декомпрессия назогастральным зонdom
- Инфузионная терапия
- Наблюдение 24-48 ч

**Хирургическое (показания):**
- Странгуляция
- Отсутствие эффекта от консервативной терапии
- Толстокишечная непроходимость

### Острый панкреатит

**Клиника:**
- Опоясывающая боль в эпигастрии
- Рвота
- Повышение амилазы, липазы (>3N)

**Диагностика:**
- КТ (оценка некроза, осложнений)
- Оценка тяжести (Ranson, APACHE II, BISAP)

**Лечение:**
**Консервативное:**
- Инфузионная терапия
- Аналгезия
- Раннее энтеральное питание (через зонд за связку Трейца)

**Хирургическое:**
- Инфицированный панкреонекроз
- Абдоминальный компартмент-синдром
- Предпочтение минимально инвазивным методам (step-up approach)

### Мезентериальная ишемия

**Причины:**
- Эмболия ВБА
- Тромбоз ВБА
- Неокклюзионная ишемия
- Венозный тромбоз

**Клиника:**
- Сильная боль, несоответствующая объективным данным
- Кровь в стуле (поздний признак)
- Лактатацидоз

**Диагностика:**
- КТ-ангиография (золотой стандарт)
- Высокий лактат

**Лечение:**
- Экстренная операция
- Реваскуляризация (эмболэктомия, тромбэктомия, шунтирование)
- Резекция нежизнеспособной кишки
- Second-look операция через 24-48 ч
- Летальность высокая (50-80%)

## Хирургическая тактика

### Damage Control Surgery

Применяется у критических пациентов с коагулопатией, гипотермией, ацидозом.

**Принципы:**
1. Контроль кровотечения и контаминации
2. Временное закрытие живота
3. Реанимация в ОИТ
4. Окончательная реконструкция через 24-72 ч

### Лапароскопия vs Лапаротомия

**Лапароскопия возможна:**
- Острый аппендицит
- Острый холецистит
- Перфорация язвы (у стабильных пациентов)
- Диагностическая при неясной картине

**Лапаротомия предпочтительна:**
- Гемодинамическая нестабильность
- Перитонит
- Массивная кишечная непроходимость
- Мезентериальная ишемия

## Интенсивная терапия

### Инфузионная терапия
- Ранняя агрессивная ресусцитация
- Goal-directed therapy
- Избегать перегрузки жидкостью

### Антибиотикотерапия
- Эмпирическая широкого спектра
- Деэскалация по культурам
- Контроль источника инфекции критичен

### Нутритивная поддержка
- Раннее энтеральное питание предпочтительно
- Парентеральное при невозможности энтерального

### Профилактика осложнений
- ВТЭО профилактика
- Профилактика стресс-язв
- Гликемический контроль

## Абдоминальный компартмент-синдром

### Определение
Внутрибрюшное давление >20 мм рт.ст. с органной дисфункцией.

### Факторы риска
- Массивная инфузионная терапия
- Панкреатит
- Абдоминальная травма
- Перитонит

### Лечение
- Медикаментозное (аналгезия, седация, миорелаксанты)
- Декомпрессия (назогастральный зонд, клизмы)
- Хирургическая декомпрессия при IAP >25 мм рт.ст.

## Заключение

Успех в экстренной абдоминальной хирургии зависит от:
- Быстрой диагностики
- Своевременного хирургического вмешательства
- Адекватной интенсивной терапии
- Мультидисциплинарного подхода

Приоритет - контроль источника инфекции и/или кровотечения с минимизацией травматичности у критических пациентов.`,
      category: 'Неотложная хирургия',
      publishedAt: new Date('2024-07-15'),
    },
    {
      title: 'Интраоперационная флуоресцентная навигация в хирургии',
      excerpt: 'Применение ICG флуоресценции для визуализации сосудов, перфузии и лимфооттока.',
      content: `# Интраоперационная флуоресцентная навигация в хирургии

## Введение

Флуоресцентная навигация с использованием индоцианина зеленого (ICG) революционизировала интраоперационную визуализацию. Технология позволяет оценивать перфузию, идентифицировать анатомические структуры и направлять хирургические решения в режиме реального времени.

## Принцип работы

### Индоцианин зеленый (ICG)
- Флуоресцентный краситель, одобренный FDA с 1959 года
- Связывается с белками плазмы
- Флуоресцирует в ближнем инфракрасном спектре (800-830 нм) при возбуждении светом 760 нм
- Быстрая элиминация печенью (период полувыведения 3-5 минут)
- Отсутствие нефротоксичности

### Технология визуализации
**Системы:**
- Интегрированные в лапароскопические/роботические системы
- Портативные устройства для открытой хирургии
- Возможность переключения между белым светом и флуоресценцией

**Дозировка ICG:**
- Оценка перфузии: 0.05-0.5 мг/кг (обычно 2.5-7.5 мг)
- Картирование лимфоузлов: 1-5 мг в подслизистый/субсерозный слой

## Применение в абдоминальной хирургии

### 1. Оценка перфузии и жизнеспособности кишки

**Показания:**
- Резекции кишки (оценка линии резекции)
- Формирование анастомозов
- Мезентериальная ишемия

**Техника:**
- Внутривенное болюсное введение ICG
- Визуализация через 30-60 секунд
- Оценка флуоресценции в зоне интереса

**Результаты исследований:**
- Снижение частоты несостоятельности анастомозов на 30-50%
- Изменение хирургической тактики в 5-10% случаев
- Особенно ценно при низких колоректальных анастомозах

### 2. Визуализация билиарных структур

**Холецистэктомия:**
- Идентификация анатомии треугольника Кало
- Предотвращение повреждений желчных протоков
- Визуализация аберрантных протоков

**Техника:**
- ICG вводится за 1-24 часа до операции (доза 0.5 мг/кг)
- Или интраоперационно внутривенно
- Флуоресценция желчи позволяет визуализировать протоки

**Эффективность:**
- Улучшение визуализации критических структур
- Снижение частоты конверсий
- Особенно ценно при остром холецистите, ожирении

### 3. Хирургия печени

**Применения:**
- Идентификация опухолевых узлов
- Определение границ резекции
- Оценка перфузии остаточной паренхимы

**Техника сегментарной окраски:**
- Пункция соответствующей ветви воротной вены
- Введение ICG
- Визуализация окрашенного сегмента

**Результаты:**
- Выявление дополнительных метастазов в 10-20% случаев
- Более точное определение границ резекции
- Снижение послеоперационной печеночной недостаточности

### 4. Онкохирургия желудочно-кишечного тракта

**Картирование лимфоузлов:**
- Подслизистая/субсерозная инъекция ICG вокруг опухоли
- Визуализация лимфооттока в режиме реального времени
- Идентификация сторожевых лимфоузлов

**Рак желудка:**
- Оценка перфузии культи желудка/пищевода
- Картирование лимфоузлов
- Определение границ резекции

**Колоректальный рак:**
- Оценка кровоснабжения при формировании анастомоза
- Визуализация лимфоузлов
- Определение линии резекции брыжейки

### 5. Эзофагогастральная хирургия

**Оценка перфузии гастрического кондуита:**
- При эзофагэктомии критически важна перфузия желудочной трубки
- ICG позволяет выявить зоны ишемии
- Изменение уровня анастомоза при недостаточной перфузии

**Результаты:**
- Снижение несостоятельности анастомозов
- Снижение частоты некроза кондуита
- Улучшение отдаленных результатов

### 6. Бариатрическая хирургия

**Оценка перфузии желудочной трубки:**
- При sleeve гастрэктомии
- Выявление зон ишемии
- Профилактика несостоятельности степлерной линии

## Другие применения

### Гепатобилиарная хирургия
- Идентификация желчных протоков при сложной анатомии
- Выявление билиарных утечек

### Панкреатическая хирургия
- Оценка кровоснабжения панкреатического остатка
- Профилактика панкреатической фистулы

### Колопроктология
- Трансанальная хирургия (TaTME)
- Оценка перфузии при болезни Крона

## Преимущества технологии

1. **Режим реального времени:** немедленная визуализация
2. **Безопасность:** низкая частота аллергических реакций (<0.05%)
3. **Простота:** интеграция в существующее оборудование
4. **Объективность:** количественная оценка перфузии

## Ограничения

1. **Глубина проникновения:** до 5-10 мм
2. **Зависимость от оператора:** интерпретация изображений
3. **Стоимость:** дополнительные расходы на краситель и оборудование
4. **Отсутствие стандартизации:** протоколы различаются между центрами

## Противопоказания

- Аллергия на ICG или йод (редко)
- Гипертиреоз (относительное)

## Количественная флуоресценция

Новые системы позволяют количественную оценку:
- Время появления флуоресценции
- Пиковая интенсивность
- Скорость нарастания
- Построение кривых "интенсивность-время"

**Пороговые значения:**
- Для адекватной перфузии кишки: >25% от максимума
- Позволяет более объективную оценку

## Будущие направления

### Новые флуорофоры
- Целевая флуоресценция (tumor-targeted)
- Метаболическая флуоресценция (для опухолей)
- Мультиспектральная визуализация

### Искусственный интеллект
- Автоматический анализ флуоресценции
- Количественная оценка
- Предикция несостоятельности анастомозов

### Расширение применения
- Торакальная хирургия
- Урология
- Гинекология

## Обучение

**Кривая обучения:**
- Относительно короткая (15-20 случаев)
- Требуется понимание ограничений
- Симуляторы для тренинга

## Экономическая эффективность

**Затраты:**
- ICG: $50-100 за дозу
- Оборудование: интегрировано в новые системы

**Выгоды:**
- Снижение осложнений
- Уменьшение числа реопераций
- Сокращение госпитализации

Исследования показывают cost-effectiveness при колоректальных резекциях и эзофагэктомиях.

## Заключение

Флуоресцентная навигация с ICG - ценный инструмент современного хирурга. Технология повышает безопасность операций, снижает частоту осложнений и помогает в принятии интраоперационных решений. По мере развития и стандартизации протоколов, применение будет расширяться.

**Ключевые моменты:**
- Оценка перфузии снижает несостоятельность анастомозов
- Визуализация билиарных структур предотвращает повреждения
- Картирование лимфоузлов улучшает стадирование
- Безопасность и простота использования
- Будущее - в автоматизированном анализе и целевых флуорофорах`,
      category: 'Технологии',
      publishedAt: new Date('2024-08-01'),
    },
  ];

  for (const article of articles) {
    await prisma.article.create({ data: article });
  }

  console.log('✅ Статьи созданы (15 статей)');

  // Создание FAQ (20 вопросов)
  const faqs = [
    {
      question: 'Что такое лапароскопическая операция?',
      answer: 'Лапароскопическая операция - это современный малоинвазивный метод хирургического лечения, при котором вмешательство выполняется через небольшие проколы (0.5-1 см) в брюшной стенке. Через эти проколы вводятся специальные инструменты и видеокамера, позволяющая хирургу видеть операционное поле на мониторе. Такой подход имеет множество преимуществ: меньшая травматичность, менее выраженный болевой синдром, быстрое восстановление, короткие сроки госпитализации, лучший косметический эффект. Лапароскопические операции широко применяются для лечения заболеваний желчного пузыря, грыж, опухолей желудка и кишечника, и многих других патологий.',
      category: 'Общие вопросы',
    },
    {
      question: 'Как подготовиться к операции на органах брюшной полости?',
      answer: 'Подготовка к плановой операции включает несколько важных этапов: 1) Предоперационное обследование: анализы крови, мочи, ЭКГ, рентген грудной клетки, консультации специалистов. 2) За 2 недели до операции прекращается прием антикоагулянтов (по согласованию с врачом). 3) За несколько дней рекомендуется легкая диета. 4) Механическая подготовка кишечника обычно не требуется при современном подходе. 5) За 6 часов до операции нельзя есть твердую пищу. 6) За 2 часа до операции можно пить прозрачные жидкости (если разрешил анестезиолог). 7) Вечером накануне и утром в день операции принять душ. 8) Не курить хотя бы 4-6 недель до операции. Ваш хирург даст вам подробные индивидуальные инструкции.',
      category: 'Подготовка к операции',
    },
    {
      question: 'Сколько времени длится восстановление после лапароскопической операции?',
      answer: 'Восстановление после лапароскопической операции зависит от вида вмешательства. После простых операций (холецистэктомия, аппендэктомия) большинство пациентов выписываются через 1-2 дня и возвращаются к обычной активности через 1-2 недели. После более сложных резекций (желудка, кишечника) госпитализация составляет 5-7 дней, полное восстановление - 3-6 недель. В течение первых недель рекомендуется избегать тяжелых физических нагрузок, постепенно увеличивая активность. Боль обычно умеренная и хорошо контролируется обезболивающими препаратами. Важно следовать рекомендациям врача по диете, активности и приему лекарств. При возникновении тревожных симптомов (лихорадка, сильная боль, рвота) немедленно обратитесь к врачу.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Что такое Enhanced Recovery (ERAS) протокол?',
      answer: 'ERAS (Enhanced Recovery After Surgery) - это современная научно обоснованная программа ускоренного восстановления после операций. Она включает комплекс мер до, во время и после операции, направленных на снижение стресса для организма и ускорение выздоровления. Основные компоненты: минимальное предоперационное голодание, отказ от рутинной подготовки кишечника, ранняя активизация (вставание и ходьба с первого дня), раннее возобновление питания, эффективное обезболивание с минимальным использованием наркотических препаратов, профилактика тошноты и рвоты. Применение ERAS протоколов сокращает срок госпитализации на 30-50%, снижает частоту осложнений и ускоряет возвращение к нормальной жизни. Этот подход стал стандартом в современной хирургии.',
      category: 'Общие вопросы',
    },
    {
      question: 'Какие осложнения возможны после операций на желудке и кишечнике?',
      answer: 'Хотя современная хирургия стала значительно безопаснее, осложнения возможны после любой операции. Ранние осложнения (первые 30 дней): кровотечение (1-3%), несостоятельность анастомоза (соединения кишки) - 2-5%, инфекции области операции - 5-10%, кишечная непроходимость, тромбоэмболические осложнения (при отсутствии профилактики). Поздние осложнения: спайки брюшной полости, послеоперационная грыжа, стриктуры (сужения) анастомозов. Для минимизации рисков применяются: тщательная хирургическая техника, профилактика тромбозов, антибиотики, ранняя активизация, современные протоколы ведения. Ваш хирург обсудит с вами индивидуальные риски и меры профилактики. При современном уровне хирургии большинство операций проходят успешно без серьезных осложнений.',
      category: 'Риски и осложнения',
    },
    {
      question: 'Когда можно вернуться к работе после операции?',
      answer: 'Сроки возвращения к работе зависят от типа операции и характера вашей работы. После малых лапароскопических операций (холецистэктомия, аппендэктомия): при сидячей работе - через 1-2 недели, при физической работе - через 3-4 недели. После больших операций (резекции желудка, кишечника): офисная работа - через 4-6 недель, физический труд - через 8-12 недель. Факторы, влияющие на сроки: скорость индивидуального восстановления, наличие осложнений, ваше общее состояние здоровья, требования на работе. Рекомендуется обсудить с работодателем возможность постепенного возвращения к работе с неполным рабочим днем. Не спешите возвращаться слишком рано - это может замедлить восстановление. Ваш хирург выдаст больничный лист на необходимый период и даст рекомендации по трудовой активности.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Нужна ли специальная диета после операции на желудке или кишечнике?',
      answer: 'Да, питание после операций на желудочно-кишечном тракте требует особого внимания. В первые дни: начинается с прозрачных жидкостей (вода, бульон), затем постепенный переход к обычной пище. Общие рекомендации после выписки: частое дробное питание (5-6 раз в день малыми порциями), хорошее пережевывание пищи, избегание очень горячей или холодной пищи, ограничение жареного, острого, жирного в первый месяц, достаточное потребление белка для заживления, адекватная гидратация. После резекции желудка: могут потребоваться пожизненные инъекции витамина B12, дополнительный прием железа, кальция, поливитаминов. Конкретные рекомендации зависят от типа операции. Диетолог может помочь составить индивидуальный план питания. Большинство пациентов постепенно возвращаются к привычному рациону.',
      category: 'Питание',
    },
    {
      question: 'Что такое роботизированная хирургия и чем она отличается от лапароскопии?',
      answer: 'Роботизированная хирургия - это продвинутый вид малоинвазивной хирургии, где операция выполняется с помощью хирургического робота (например, da Vinci). Хирург управляет роботом, сидя за специальной консолью. Преимущества по сравнению с традиционной лапароскопией: трехмерное изображение высокой четкости (vs двумерное), инструменты с 7 степенями свободы (имитируют движения кисти), устранение дрожания рук, лучшая эргономика для хирурга, возможность выполнения более сложных манипуляций. Особенно полезна при операциях в труднодоступных местах (таз, верхний этаж брюшной полости). Недостатки: высокая стоимость оборудования и расходных материалов, отсутствие тактильной обратной связи, более длительная настройка системы. Онкологические и функциональные результаты роботизированных операций сопоставимы с лапароскопическими, но с преимуществами в отдельных ситуациях.',
      category: 'Технологии',
    },
    {
      question: 'Можно ли оперировать при ожирении?',
      answer: 'Да, ожирение не является абсолютным противопоказанием к операции, но повышает риски. Возможные проблемы при ожирении: технические сложности операции (толщина брюшной стенки, смещение органов), повышенный риск раневых инфекций, тромбоэмболических осложнений, послеоперационной грыжи, дыхательных нарушений. Меры снижения рисков: предоперационное снижение веса (даже 5-10 кг), усиленная профилактика тромбозов, возможно использование специальных удлиненных инструментов, опыт хирурга в операциях у пациентов с ожирением. При морбидном ожирении (ИМТ >40) может быть рассмотрена бариатрическая операция до основного вмешательства. Современные технологии (лапароскопия, роботизированная хирургия) частично нивелируют технические трудности. Важна честная беседа с хирургом о рисках и способах их минимизации. При адекватной подготовке большинство операций проходят успешно.',
      category: 'Особые ситуации',
    },
    {
      question: 'Что делать, если после операции поднялась температура?',
      answer: 'Небольшое повышение температуры (до 37.5-38°C) в первые 2-3 дня после операции - нормальная реакция организма на хирургическое вмешательство. Однако лихорадка может быть признаком осложнений. Когда нужно обратиться к врачу: температура выше 38.5°C, лихорадка продолжается более 3 дней, сопровождается ознобом, усиливающейся болью в животе, покраснением/выделениями из ран, затрудненным дыханием, кашлем. Возможные причины послеоперационной лихорадки: инфекция раны, пневмония (особенно у курильщиков), мочевая инфекция, абсцесс в брюшной полости, тромбоз вен. До визита к врачу: измеряйте температуру регулярно, пейте достаточно жидкости, можете принять парацетамол (если нет противопоказаний), не игнорируйте тревожные симптомы. Ранняя диагностика и лечение осложнений критически важны.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Останутся ли шрамы после лапароскопической операции?',
      answer: 'После лапароскопической операции остаются небольшие шрамы от проколов. Обычно делается 3-5 проколов размером от 5 до 12 мм. Со временем шрамы становятся малозаметными. Что влияет на заживление: индивидуальные особенности кожи (склонность к келоидам), расположение разрезов (вдоль линий натяжения кожи), техника ушивания, послеоперационный уход. Рекомендации для лучшего заживления: держите раны чистыми и сухими первые дни, не снимайте стерильные полоски раньше времени, избегайте натяжения в области ран, защищайте от солнца первые 6 месяцев (может потемнеть), после заживления можно использовать силиконовые гели/пластыри. При склонности к келоидам обсудите с хирургом профилактические меры. Большинство пациентов довольны косметическим результатом лапароскопических операций.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Как проходит обезболивание после операции?',
      answer: 'Современная хирургия использует мультимодальный подход к обезболиванию - комбинацию различных методов для максимального комфорта с минимальными побочными эффектами. Методы обезболивания: эпидуральная аналгезия (тонкий катетер в спине) - эффективна при больших операциях, внутривенная контролируемая пациентом аналгезия (PCA-помпа) - вы сами нажимаете кнопку, когда нужно, регулярный прием ненаркотических препаратов (парацетамол, противовоспалительные), местное обезболивание области разрезов. Интенсивность боли: обычно максимальна в первые 24-48 часов, затем постепенно снижается. Цель - боль не более 3-4 по шкале 0-10. Важно: не терпите боль - сообщите медперсоналу, боль замедляет восстановление и увеличивает риск осложнений, после выписки продолжайте регулярный прием обезболивающих по схеме.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Когда можно начинать заниматься спортом после операции?',
      answer: 'Возвращение к физической активности должно быть постепенным. Ранняя активность (ходьба): начинается с первого дня после операции, рекомендуется ходить по 5-10 минут каждые 2-3 часа, постепенно увеличивать дистанцию. Легкая активность (2-3 недели после малых операций): прогулки, легкая растяжка, повседневные дела. Умеренная активность (4-6 недель): плавание, велотренажер, легкий бег. Интенсивные нагрузки (8-12 недель после больших операций): тяжелая атлетика, контактные виды спорта, интенсивный фитнес. Признаки того, что нужно снизить нагрузку: усиление боли, отек в области операции, необычная усталость. Перед возвращением к спорту проконсультируйтесь с хирургом. Постепенное увеличение нагрузки безопаснее, чем резкое возвращение к прежнему уровню. Помните: каждый восстанавливается в своем темпе.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Что такое онкологическая хирургия и чем она отличается от обычной?',
      answer: 'Онкологическая хирургия - это специализированное направление, фокусирующееся на хирургическом лечении злокачественных опухолей. Ключевые отличия: принцип радикальности - удаление опухоли единым блоком с окружающими тканями, расширенная лимфодиссекция - удаление регионарных лимфоузлов для предотвращения метастазов, соблюдение онкологических принципов - абластика (предотвращение распространения опухолевых клеток) и антибластика, мультидисциплинарный подход - часто комбинация с химио/лучевой терапией, больший объем вмешательства по сравнению с аналогичными операциями по доброкачественным показаниям. Современные тенденции: малоинвазивные (лапароскопические, роботизированные) методы не снижают онкологическую радикальность, использование интраоперационной флуоресценции для выявления опухолевой ткани. Выполняется специально обученными онкохирургами в специализированных центрах. Правильно выполненная онкологическая операция критически важна для прогноза.',
      category: 'Онкология',
    },
    {
      question: 'Насколько безопасны операции в пожилом возрасте?',
      answer: 'Возраст сам по себе не является противопоказанием к операции, но пожилые пациенты имеют повышенные риски. Факторы риска: сопутствующие заболевания (сердце, легкие, почки), сниженный функциональный резерв, риск делирия (спутанность сознания) после операции, медленнее восстановление, недостаточность питания. Меры снижения рисков: тщательная предоперационная оценка, оптимизация хронических заболеваний, программы преабилитации (подготовка к операции), предпочтение малоинвазивных методов, усиленное послеоперационное наблюдение, протоколы профилактики делирия, ранняя активизация и физиотерапия. Хорошие новости: при правильной подготовке многие пожилые пациенты успешно переносят даже большие операции, биологический возраст важнее паспортного (активные 80-летние vs слабые 70-летние), современная анестезия и интенсивная терапия значительно повысили безопасность. Решение принимается индивидуально с учетом общего состояния, качества жизни и прогноза.',
      category: 'Особые ситуации',
    },
    {
      question: 'Когда нужна экстренная операция?',
      answer: 'Экстренная операция требуется при жизнеугрожающих состояниях, когда промедление опасно. Основные ситуации: перфорация (прорыв) полого органа - язва желудка, кишки (немедленная операция), кишечная непроходимость с странгуляцией - нарушение кровоснабжения кишки, перитонит - воспаление брюшины, острый аппендицит с осложнениями, кровотечение в брюшную полость, мезентериальная ишемия - нарушение кровотока в сосудах кишечника. Признаки, требующие немедленного обращения: внезапная сильная боль в животе, "доскообразный" (очень напряженный) живот, рвота с кровью или "кофейной гущей", отсутствие стула и газов, признаки шока (низкое давление, частый пульс, холодный пот). В экстренной ситуации: времени на подготовку минимум, риски выше, чем при плановой операции, но без операции прогноз хуже, применяются принципы "контроля повреждений" (сначала спасти жизнь, потом окончательная реконструкция). При вышеописанных симптомах немедленно вызывайте скорую помощь.',
      category: 'Неотложная хирургия',
    },
    {
      question: 'Какие анализы нужно сдать перед операцией?',
      answer: 'Стандартное предоперационное обследование включает: общий анализ крови с подсчетом тромбоцитов - оценка анемии, инфекции, свертываемости, биохимический анализ крови - функция печени, почек, уровень глюкозы, белка, коагулограмма - оценка свертывающей системы, группа крови и резус-фактор, общий анализ мочи, ЭКГ (всем старше 40 лет), флюорография или рентген грудной клетки. Дополнительные исследования при необходимости: онкомаркеры (при онкологических заболеваниях), эхокардиография (при заболеваниях сердца), спирометрия (при болезнях легких), УЗИ вен нижних конечностей (при риске тромбоза), КТ или МРТ зоны операции. Консультации специалистов: кардиолог, пульмонолог, эндокринолог и др. по показаниям. Анализы должны быть свежими (обычно не старше 10-14 дней). Полный список даст ваш хирург с учетом вашего состояния и планируемой операции.',
      category: 'Подготовка к операции',
    },
    {
      question: 'Что такое спайки и как они влияют на повторные операции?',
      answer: 'Спайки - это фиброзные тяжи, образующиеся между органами брюшной полости после операций, травм или воспалений. Формируются у 90% пациентов после абдоминальных операций как часть нормального процесса заживления. Возможные проблемы от спаек: хроническая боль в животе, кишечная непроходимость (спайки могут перекручивать или сдавливать кишку), бесплодие (у женщин при спайках в малом тазу), технические сложности при повторных операциях. Факторы риска: большие открытые операции (больше спаек, чем после лапароскопии), перитонит, множественные операции, индивидуальная склонность. Профилактика: малоинвазивные операции формируют меньше спаек, бережная хирургическая техника, использование противоспаечных барьеров (специальные материалы), ранняя активизация после операции. При повторных операциях: может потребоваться адгезиолизис (разделение спаек), повышен риск повреждения кишки, операция может занять больше времени. Спайки - неизбежное следствие операций, но современная хирургия минимизирует их образование.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Можно ли забеременеть после операций на кишечнике?',
      answer: 'Да, беременность возможна после большинства операций на кишечнике, но есть нюансы. Рекомендации по срокам: малые операции (аппендэктомия, грыжесечение) - можно планировать через 3-6 месяцев, большие резекции кишечника - лучше подождать 6-12 месяцев, онкологические операции - обсудите с онкологом (может потребоваться отсрочка на период адъювантной терапии и наблюдения). Возможные риски: спайки могут вызывать бесплодие или осложнения беременности, кишечная непроходимость при беременности (редко), необходимость кесарева сечения при обширных спайках. Благоприятные факторы: лапароскопические операции формируют меньше спаек, молодой возраст способствует лучшему заживлению. Рекомендации: планируйте беременность с вашим хирургом и гинекологом, предупредите акушера о предшествующей операции, при появлении боли во время беременности немедленно обратитесь к врачу. Большинство женщин успешно вынашивают беременность после операций на кишечнике.',
      category: 'Особые ситуации',
    },
    {
      question: 'Нужна ли реабилитация после операции?',
      answer: 'Да, реабилитация - важнейшая часть лечения, особенно после больших операций. Компоненты реабилитации: ранняя активизация - ходьба с первых дней ускоряет восстановление, дыхательная гимнастика - профилактика пневмонии (особенно у курильщиков и пожилых), лечебная физкультура - постепенное увеличение нагрузки, укрепление мышц, нутритивная поддержка - обогащенное белком питание для заживления, психологическая поддержка - особенно после онкологических операций. Программы реабилитации: амбулаторная - посещение физиотерапевта/ЛФК, стационарная - в специализированных центрах после больших операций, домашняя - самостоятельные упражнения по рекомендациям врача. Цели реабилитации: восстановление физической функции, предотвращение осложнений, возвращение к работе и активной жизни, улучшение качества жизни. Длительность: от 2-4 недель после малых операций до 3-6 месяцев после больших. Не пренебрегайте реабилитацией - она значительно ускоряет и улучшает восстановление.',
      category: 'Послеоперационный период',
    },
    {
      question: 'Как выбрать хирурга и клинику для операции?',
      answer: 'Выбор хирурга и клиники критически важен для результата лечения. Критерии выбора хирурга: специализация в конкретной области (не "хирург вообще", а "хирург-колопроктолог", "гепатобилиарный хирург" и т.д.), опыт (количество выполненных операций данного типа в год - чем больше, тем лучше), сертификация и обучение, рекомендации коллег и пациентов, готовность обсуждать риски, альтернативы, результаты. Критерии выбора клиники: статус специализированного центра по вашему заболеванию, наличие современного оборудования, мультидисциплинарная команда (хирурги, анестезиологи, реаниматологи), отделение интенсивной терапии, статистика результатов (запрашивайте данные по осложнениям, летальности). Важные вопросы хирургу: сколько таких операций вы делаете в год? какова частота осложнений? какие альтернативы существуют? почему рекомендуете именно этот метод? Не стесняйтесь получить второе мнение при сложных случаях. Доверие к хирургу и команде - важная составляющая успешного лечения.',
      category: 'Выбор врача',
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }

  console.log('✅ FAQ созданы (20 вопросов)');

  // Создание глоссария (30 терминов)
  const glossaryTerms = [
    {
      term: 'Лапароскопия',
      definition: 'Малоинвазивный метод хирургического вмешательства, при котором операция выполняется через небольшие проколы (0.5-1 см) в брюшной стенке с использованием специальных инструментов и видеокамеры. Позволяет минимизировать травму тканей, снизить болевой синдром и ускорить восстановление пациента.',
    },
    {
      term: 'Анастомоз',
      definition: 'Хирургическое соединение двух полых органов или их частей (например, участков кишечника, желудка с кишкой). Может быть выполнен ручным швом или с использованием сшивающих аппаратов (степлеров). Качество анастомоза критически важно для предотвращения осложнений.',
    },
    {
      term: 'Резекция',
      definition: 'Хирургическое удаление части органа с восстановлением его непрерывности. Например, резекция желудка - удаление части желудка с последующим соединением оставшейся части с кишечником. Объем резекции зависит от характера заболевания и его локализации.',
    },
    {
      term: 'Лимфодиссекция',
      definition: 'Удаление лимфатических узлов и окружающей клетчатки во время онкологических операций. Выполняется для предотвращения распространения опухолевых клеток по лимфатической системе. Объем лимфодиссекции (D1, D2, D3) определяет радикальность вмешательства.',
    },
    {
      term: 'Перитонит',
      definition: 'Воспаление брюшины - тонкой оболочки, выстилающей брюшную полость и покрывающей органы. Чаще всего возникает при перфорации (прорыве) полого органа или распространении инфекции. Требует экстренного хирургического лечения, так как без лечения угрожает жизни.',
    },
    {
      term: 'Холецистэктомия',
      definition: 'Операция по удалению желчного пузыря. Чаще всего выполняется лапароскопически при желчнокаменной болезни и остром холецистите. Является одной из наиболее часто выполняемых операций в абдоминальной хирургии. После операции желчь поступает напрямую из печени в кишечник.',
    },
    {
      term: 'Гастрэктомия',
      definition: 'Полное удаление желудка с восстановлением непрерывности желудочно-кишечного тракта путем соединения пищевода с тонкой кишкой. Выполняется при раке желудка, реже - при других заболеваниях. После операции требуется пожизненная нутритивная поддержка и наблюдение.',
    },
    {
      term: 'Колэктомия',
      definition: 'Операция по удалению части или всей толстой кишки. Может быть правосторонней (удаление восходящей кишки), левосторонней (нисходящей кишки), сигмоидэктомией или тотальной. Выполняется при раке, тяжелом воспалительном заболевании кишечника, дивертикулярной болезни.',
    },
    {
      term: 'Спайки',
      definition: 'Фиброзные тяжи, соединяющие внутренние органы или прикрепляющие их к брюшной стенке. Образуются после операций, травм или воспалений как часть процесса заживления. Могут вызывать боль, кишечную непроходимость и создавать технические сложности при повторных операциях.',
    },
    {
      term: 'Стома',
      definition: 'Искусственное отверстие, создаваемое хирургическим путем для выведения содержимого полого органа наружу. Колостома - выведение толстой кишки, илеостома - тонкой кишки. Может быть временной (с последующим восстановлением) или постоянной.',
    },
    {
      term: 'Эндоскопия',
      definition: 'Метод исследования внутренних органов с помощью эндоскопа - гибкой трубки с видеокамерой и источником света. Гастроскопия - исследование желудка, колоноскопия - толстой кишки. Кроме диагностики, позволяет выполнять лечебные манипуляции (биопсия, удаление полипов, остановка кровотечения).',
    },
    {
      term: 'Панкреатит',
      definition: 'Воспаление поджелудочной железы. Острый панкреатит - внезапное воспаление, часто связанное с желчными камнями или алкоголем. Может быть легким (отечным) или тяжелым (некротическим). Лечение преимущественно консервативное, хирургия требуется при осложнениях.',
    },
    {
      term: 'Грыжа',
      definition: 'Выпячивание органа или его части через дефект в мышечно-апоневротическом слое. Паховая грыжа - через паховый канал, пупочная - через пупочное кольцо, послеоперационная - через дефект в области хирургического разреза. Лечение хирургическое с установкой сетчатого импланта.',
    },
    {
      term: 'Асцит',
      definition: 'Накопление свободной жидкости в брюшной полости. Может быть следствием цирроза печени, сердечной недостаточности, злокачественных опухолей, перитонита. Проявляется увеличением живота, требует выяснения причины и соответствующего лечения.',
    },
    {
      term: 'Несостоятельность анастомоза',
      definition: 'Осложнение после операций на желудочно-кишечном тракте, когда хирургическое соединение органов не заживает должным образом и происходит подтекание содержимого. Может привести к перитониту, абсцессу, сепсису. Требует интенсивного лечения, часто повторной операции.',
    },
    {
      term: 'Абсцесс',
      definition: 'Ограниченное скопление гноя в тканях или органах, окруженное капсулой. Может возникнуть после операций, перфорации органов, распространения инфекции. Лечится дренированием (открытым или под контролем УЗИ/КТ) и антибиотиками.',
    },
    {
      term: 'Желчнокаменная болезнь',
      definition: 'Образование камней в желчном пузыре или желчных протоках. Камни могут вызывать приступы боли (желчная колика), острое воспаление пузыря (холецистит), закупорку протоков с желтухой и панкреатитом. Стандартное лечение - лапароскопическая холецистэктомия.',
    },
    {
      term: 'Кишечная непроходимость',
      definition: 'Нарушение продвижения содержимого по кишечнику. Может быть механической (спайки, опухоль, заворот) или динамической (нарушение перистальтики). Проявляется болью, вздутием, задержкой стула и газов, рвотой. Требует экстренной госпитализации и часто хирургического лечения.',
    },
    {
      term: 'Метастазы',
      definition: 'Вторичные опухолевые очаги, возникающие в результате распространения раковых клеток из первичной опухоли по лимфатическим или кровеносным сосудам. Наличие и локализация метастазов определяют стадию рака и влияют на выбор лечения и прогноз.',
    },
    {
      term: 'Дренаж',
      definition: 'Трубка или система трубок, устанавливаемая в рану, брюшную полость или абсцесс для удаления жидкости, крови или гноя. Помогает предотвратить скопление патологического содержимого и способствует заживлению. Удаляется после прекращения отделяемого.',
    },
    {
      term: 'Биопсия',
      definition: 'Взятие образца ткани для микроскопического исследования. Позволяет установить точный диагноз, определить характер опухоли (доброкачественная или злокачественная), оценить степень дифференцировки. Может быть выполнена эндоскопически, под контролем УЗИ/КТ или во время операции.',
    },
    {
      term: 'Лапаротомия',
      definition: 'Открытая операция с разрезом передней брюшной стенки для доступа к органам брюшной полости. В отличие от лапароскопии, обеспечивает прямой визуальный и тактильный контроль, но более травматична. Может быть срединной, поперечной или косой в зависимости от локализации патологии.',
    },
    {
      term: 'Перфорация',
      definition: 'Образование сквозного дефекта (отверстия) в стенке полого органа (желудок, кишечник). Возникает при язвенной болезни, опухолях, травмах, воспалении. Приводит к попаданию содержимого органа в брюшную полость и развитию перитонита. Требует экстренной операции.',
    },
    {
      term: 'Аппендицит',
      definition: 'Острое воспаление червеобразного отростка слепой кишки. Проявляется болью в правой подвздошной области, тошнотой, рвотой, повышением температуры. Без лечения может привести к перфорации и перитониту. Лечение - хирургическое удаление отростка (аппендэктомия).',
    },
    {
      term: 'Язвенная болезнь',
      definition: 'Хроническое заболевание с образованием дефектов (язв) в стенке желудка или двенадцатиперстной кишки. Основные причины - инфекция Helicobacter pylori и прием НПВС. Осложнения - кровотечение, перфорация, стеноз. Лечение обычно консервативное, операция при осложнениях.',
    },
    {
      term: 'Дивертикулез',
      definition: 'Наличие дивертикулов - мешковидных выпячиваний стенки кишки. Чаще поражается сигмовидная кишка. Может быть бессимптомным или осложниться дивертикулитом (воспаление), кровотечением, перфорацией. Лечение зависит от наличия и тяжести осложнений.',
    },
    {
      term: 'Гепатэктомия',
      definition: 'Операция по удалению части печени. Может быть анатомической (удаление определенных сегментов) или атипичной. Выполняется при злокачественных и доброкачественных опухолях, метастазах, травмах. Печень обладает уникальной способностью к регенерации.',
    },
    {
      term: 'Инфузионная терапия',
      definition: 'Внутривенное введение жидкостей для коррекции водно-электролитного баланса, поддержания адекватного объема циркулирующей крови и доставки лекарств. Критически важна в периоперационном периоде. Современный подход - целенаправленная (goal-directed) терапия с мониторингом.',
    },
    {
      term: 'Сепсис',
      definition: 'Системная воспалительная реакция организма на инфекцию с развитием органной дисфункции. Может осложнить послеоперационный период, особенно при перитоните, несостоятельности анастомоза, абсцессах. Требует интенсивной терапии: антибиотики, инфузия, вазопрессоры, контроль источника инфекции.',
    },
    {
      term: 'Эзофагэктомия',
      definition: 'Операция по удалению пищевода, обычно выполняемая при раке. Является одной из наиболее сложных операций в хирургии. Включает резекцию пищевода и реконструкцию с использованием желудка или кишки для восстановления непрерывности пищеварительного тракта.',
    },
  ];

  for (const term of glossaryTerms) {
    await prisma.glossaryTerm.create({ data: term });
  }

  console.log('✅ Глоссарий создан (30 терминов)');

  // Создание тестов для каждого курса
  console.log('📝 Создание тестов...');
  
  const quizzes = [];
  for (const course of courses) {
    const quiz = await prisma.quiz.create({
      data: {
        title: `Quiz: ${course.title}`,
        description: `Test your knowledge after completing ${course.title}`,
        passingScore: 70,
        course: {
          connect: { id: course.id }
        },
        questions: {
          create: generateQuizQuestions(course.title)
        }
      },
      include: {
        questions: true
      }
    });
    quizzes.push(quiz);
  }

  console.log(`✅ Тесты созданы (${quizzes.length} тестов)`);
  console.log('🎉 База данных успешно наполнена!');
}

// Функция для генерации вопросов теста
function generateQuizQuestions(courseTitle: string) {
  const baseQuestions = [
    {
      question: "What is the primary goal of minimally invasive surgery?",
      options: [
        "Reduced recovery time and minimal scarring",
        "Increased surgical duration",
        "Higher complication rates",
        "Traditional open approach benefits"
      ],
      correctAnswer: 0,
      explanation: "Minimally invasive surgery aims to reduce trauma, leading to faster recovery and minimal scarring.",
      order: 1
    },
    {
      question: "Which technique is commonly used in laparoscopic procedures?",
      options: [
        "Large incisions",
        "Trocar insertion and pneumoperitoneum",
        "No visualization required",
        "Manual palpation only"
      ],
      correctAnswer: 1,
      explanation: "Laparoscopic procedures use trocars for instrument insertion and create pneumoperitoneum for visualization.",
      order: 2
    },
    {
      question: "What is a key advantage of robotic-assisted surgery?",
      options: [
        "Lower cost",
        "Enhanced precision and dexterity",
        "Faster procedure time",
        "No learning curve"
      ],
      correctAnswer: 1,
      explanation: "Robotic systems provide enhanced precision, 3D visualization, and improved dexterity for complex procedures.",
      order: 3
    },
    {
      question: "What should be assessed during preoperative evaluation?",
      options: [
        "Only patient's age",
        "Comprehensive medical history and comorbidities",
        "Surgical room availability only",
        "None of the above"
      ],
      correctAnswer: 1,
      explanation: "Preoperative evaluation must include complete medical history, comorbidities, and risk assessment.",
      order: 4
    },
    {
      question: "What is the most critical step in preventing surgical complications?",
      options: [
        "Rushing through procedures",
        "Proper sterile technique and preparation",
        "Skipping safety checklists",
        "Ignoring patient concerns"
      ],
      correctAnswer: 1,
      explanation: "Proper sterile technique, thorough preparation, and adherence to safety protocols are essential.",
      order: 5
    }
  ];

  return baseQuestions.map(q => ({
    ...q,
    options: JSON.stringify(q.options)
  }));
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при наполнении базы данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
