#!/bin/bash

# Замена российских авторов и клиник на международные
sed -i "s/К\.м\.н\. Сидоров М\.П\./Dr. Robert Wilson/g" seed.ts
sed -i "s/Медицинский центр МГУ/Cleveland Clinic/g" seed.ts

sed -i "s/Проф\. Козлов В\.А\./Prof. David Miller/g" seed.ts
sed -i "s/РОНЦ им\. Н\.Н\. Блохина/MD Anderson Cancer Center/g" seed.ts

sed -i "s/Д\.м\.н\. Морозов Д\.А\./Dr. Christopher Lee/g" seed.ts
sed -i "s/НИИ колопроктологии/St. Mark's Hospital/g" seed.ts

sed -i "s/К\.м\.н\. Николаев Е\.В\./Dr. Thomas Martinez/g" seed.ts
sed -i "s/Клиника высоких медицинских технологий/Massachusetts General Hospital/g" seed.ts

sed -i "s/Проф\. Алексеев Н\.С\./Prof. Richard Brown/g" seed.ts
sed -i "s/ФГБУ НМИЦ хирургии/Stanford Health Care/g" seed.ts

sed -i "s/Д\.м\.н\. Смирнов А\.Ю\./Dr. Andrew Thompson/g" seed.ts
sed -i "s/Европейская клиника/University Hospital Zurich/g" seed.ts

sed -i "s/Проф\. Давыдов М\.И\./Prof. John Williams/g" seed.ts
sed -i "s/МНИОИ им\. П\.А\. Герцена/Memorial Sloan Kettering Cancer Center/g" seed.ts
sed -i "s/МНИОИ им\. Герцена/Memorial Sloan Kettering Cancer Center/g" seed.ts

sed -i "s/К\.м\.н\. Романов Т\.С\./Dr. Daniel Garcia/g" seed.ts
sed -i "s/НИИ скорой помощи им\. Склифосовского/Brigham and Women's Hospital/g" seed.ts
sed -i "s/НИИ скорой помощи/Brigham and Women's Hospital/g" seed.ts

sed -i "s/Проф\. Кириллов Ю\.Б\./Prof. William Harris/g" seed.ts
sed -i "s/НМИЦ онкологии/National Cancer Institute/g" seed.ts

sed -i "s/Д\.м\.н\. Федоров В\.Д\./Dr. Charles Martin/g" seed.ts
sed -i "s/ГНЦ колопроктологии/Cleveland Clinic Florida/g" seed.ts
sed -i "s/Проф\. Федоров В\.Д\./Prof. Charles Martin/g" seed.ts

sed -i "s/Проф\. Вишневский В\.А\./Prof. Paul Jackson/g" seed.ts
sed -i "s/Институт хирургии им\. Вишневского/Cedars-Sinai Medical Center/g" seed.ts

sed -i "s/Проф\. Королев М\.П\./Prof. Steven White/g" seed.ts
sed -i "s/РОНЦ им\. Блохина/MD Anderson Cancer Center/g" seed.ts

sed -i "s/Д\.м\.н\. Черноусов А\.Ф\./Dr. Edward Robinson/g" seed.ts
sed -i "s/Первый МГМУ им\. Сеченова/Mount Sinai Hospital/g" seed.ts
sed -i "s/Проф\. Черноусов А\.Ф\./Prof. Edward Robinson/g" seed.ts

sed -i "s/К\.м\.н\. Патютко Ю\.И\./Dr. Kenneth Clark/g" seed.ts

sed -i "s/Д\.м\.н\. Тимербулатов В\.М\./Dr. Benjamin Lewis/g" seed.ts
sed -i "s/Башкирский ГМУ/University of California Medical Center/g" seed.ts

sed -i "s/К\.м\.н\. Егоров А\.В\./Dr. Matthew Walker/g" seed.ts
sed -i "s/НМИЦ хирургии/UCLA Medical Center/g" seed.ts

sed -i "s/Проф\. Кубышкин В\.А\./Prof. Joseph Young/g" seed.ts
sed -i "s/МГМСУ им\. Евдокимова/NewYork-Presbyterian Hospital/g" seed.ts

sed -i "s/Д\.м\.н\. Прудков М\.И\./Dr. Timothy Allen/g" seed.ts
sed -i "s/Уральский ГМУ/Toronto General Hospital/g" seed.ts

sed -i "s/Д\.м\.н\. Тимошин А\.Д\./Dr. Samuel King/g" seed.ts
sed -i "s/РНИМУ им\. Пирогова/Royal Marsden Hospital/g" seed.ts

sed -i "s/К\.м\.н\. Жуков Б\.Н\./Dr. Mark Wright/g" seed.ts

sed -i "s/Д\.м\.н\. Ефанов М\.Г\./Dr. Brian Scott/g" seed.ts

sed -i "s/К\.м\.н\. Бебуришвили А\.Г\./Dr. George Turner/g" seed.ts
sed -i "s/Волгоградский ГМУ/University Hospital of Geneva/g" seed.ts

sed -i "s/Д\.м\.н\. Ачкасов С\.И\./Dr. Patrick Mitchell/g" seed.ts

echo "Замена завершена!"
