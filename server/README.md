# Quiz_maker loyhasi uchun backend API ❔

## Loyha maqsadi 🎯
- Odamlarga oson yo'lda o'zini ustida ishlash uchun yoki studentlarini savol javob qilish uchun ilova
- Bu ilova uch xil tillarda bo'ladi bular:ru , en , uz
- Ilova juda kuchli xavfsizlik kafolat beradi
- Ilova ishlatishqa qulay va tushunishga oson bo'ladi

## Loyhani xususiyatlari
- Foydalanuvchi qulaylik bilan yangi test to'plamlari tayorlay olishi kk
- Test to'plamrari 1-40 tagacha testga ega bo'lishi kk
- Foydalanuvchi osonlik bilan login yoki register qilishi kk 
- Foydalanuvchi oauth ham qila olishi lozim 

## Nofunksional talablar:
- Tezlik
- Xavfsizlik
- Kengaya oladigan


## Database models:

1. quiz_collection
  - name
  - quizes []
  - created_at
  - updated_at

2. quizes
  - question
  - created_at
  - updated_at

3. correct_answer
  - question_id
  - answers_id  