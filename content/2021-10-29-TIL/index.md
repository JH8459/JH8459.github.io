---
emoji: π
title: Amazon Web Service, AWS λ°°ν¬ μ€μ΅
date: '2021-10-29'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## βοΈ **T**oday **I** **L**earned

---

<br>

### 1. Amazon Web Service

---

- μΉ μλΉμ€ λ°°ν¬λ₯Ό μν λ°©λ²μΌλ‘ κ°μν κΈ°μ (κ°μμ μ»΄ν¨ν°λ₯Ό λμ¬)μ μ¬μ©νλ ν΄λΌμ°λ μ»΄ν¨νμ μ¬μ©ν  μ μλ€.

- ν΄λΌμ°λ μ»΄ν¨ν μλΉμ€ μ€ κ°μ₯ μ λͺν κ²μ΄ Amazon Web Service(AWS)μ΄λ€.

<br>
<br>

#### 1-1. Cloud Computing

---

- ν΄λΌμ°λ λ±μ₯ μ΄μ μ λ°©μμ νν λ§νλ μ μ°μ€ λ±μ μ»΄ν¨ν°λ₯Ό λ°°μΉνκ³  μΈν°λ·μ μ°κ²°νμ¬ μλΉμ€λ₯Ό μ κ³΅νλ€.

  <center><img src="https://user-images.githubusercontent.com/83164003/144698139-d85f1899-2867-4e66-9ddd-e045bd12bfde.jpeg"/></center><br>

  νμ§λ§ μ΄λ¬ν κ²½μ° μλ²κ° μμ²­μ λν μμ© λ₯λ ₯μ΄ νκ³μ λλ¬νλ€λ©΄ κ°μ κ³΅κ°μ μλ²λ₯Ό μΆκ°νκ±°λ μλ²μ μ±λ₯μ μκ·Έλ μ΄λνλ λ°©μμ μ±νν΄μΌνλ€.

- μ΄λ¬ν λ°©μμ λ¬Έμ λ λͺκ°μ§ λ¬Έμ μ μ κ°μ§κ³  μλ€.

  1. **μ£ΌκΈ°μ μΈ κ΄λ¦¬κ° νμ** : νν λ§νλ μλ²μ€μλ μ’μ’ κ³ μ₯μ΄ λκ±°λ μΈν°λ·κ³Ό μ°κ²°μ΄ λμ§ μλ μκΈ°μΉ λͺ»ν λ¬Έμ κ° μκΈ°κΈ°λ νλ€.<br>
     μ΄λ° μν©μ΄ λ°μνλ€λ©΄ κ·λͺ¨κ° μμ μλ²λΌλ μ΄λ₯Ό ν΄κ²°νκΈ° μν μΈλ ₯ λ° λΉμ©μ΄ λΆκ°νΌνκ² ν¬μλμ΄μΌ λ¬Έμ  ν΄κ²°μ΄ κ°λ₯νλ€.

  2. **κ³΅κ°μ νκ³** : λμ§Έλ‘ λ°μνλ λ¬Έμ μ μ λ¬Όλ¦¬μ μΈ κ³΅κ°μ λ¬Έμ μ μ΄λ€. μλ²μ€μ΄λΌλ κ³΅κ°μ μ»΄ν¨ν°λ₯Ό λ°°μΉν΄ λκ³  λ°μνλ νΈλν½μλ°λΌ μλ²λ₯Ό μΆκ°νλ λ°©μμΌλ‘ μλ²μ μμ© λ₯λ ₯μ ν₯μν΄μΌνμ§λ§, νΈλν½μ΄ λ§€μ° λ§μμ§λ κ²½μ° λ¬Όλ¦¬μ μΈ κ³΅κ°μ μ μ½μ΄ μκΈΈμκ° μλ€.

- μ΄λ¬ν λ¬Όλ¦¬μ μΈ λ¬Έμ μ λ€μ κ·Ήλ³΅νκΈ° μνμ¬ λμ¨ κ°λμ΄ μλ²μ μμκ³Ό κ³΅κ°, λ° λ€νΈμν¬ νκ²½μ μΈλΆλ‘ λΆν° μ κ³΅μ λΉλ € λ°μ μ¬μ©νλ **ν΄λΌμ°λ μ»΄ν¨ν**μ΄λ€.

<br>
<br>

#### 1-2. ν΄λΌμ°λμ λ±μ₯

---

- μμ λ§ν μλ²μ μμκ³Ό κ³΅κ°, λ° λ€νΈμν¬ νκ²½μ λΉλ €μ£Όλ κ³³μ λ°μ΄ν° μΌν°λΌ μΌμ»«λλ€. (μ΄λ¬ν νκ²½μ **μ¨νλ λ―Έμ€**λΌ λΆλ₯΄λ©°, λ°λ κ°λμΈ **μ€ννλ λ―Έμ€**λ μμμ λ§ν μλ²μ€κ°μ νκ²½μ λ§νλ€.)

  ![μ€ν¬λ¦°μ·, 2021-12-04 14-24-55](https://user-images.githubusercontent.com/83164003/144698437-cb81a76c-a0ae-4be8-bf98-f587e7316ecd.png)

- ν΄λΌμ°λ μ»΄ν¨νμ μμ μ€λͺν λ°μ΄ν°μΌν°κ°μ μ¨νλ λ―Έμ€ νκ²½κ³Ό λΉμ·ν μ­ν μ νμ§λ§, λ¬Όλ¦¬μ μΈ μ»΄ν¨ν°κ° μλ κ°μ μ»΄ν¨ν°λ₯Ό λμ¬νλ€λ μ μ΄ λ€λ₯΄λ€.

- μ¨νλ λ―Έμ€ νκ²½κ³Ό λ€λ₯΄κ² κ°μν(Virtualization) κΈ°μ μ κ°μ§ ν΄λΌμ°λ© μ»΄ν¨ν°κ° κ°λ μ΄μ μ λ€μκ³Ό κ°λ€.

  1. μ¬μ©μ΄ νμν  λλ§λ€ μ»΄ν¨ν λ₯λ ₯μ μ μ°νκ² μ‘°μ ν  μ μλ€.
  2. μ΄μ©κΈ°κ°μ λ°λΌ κ³ μ μ μΈ λΉμ©μ΄ λ€μ΄κ°λ μ¨νλ λ―Έμ€(μ μ‘μ )μλ λ¬λ¦¬ μ¬μ©ν λ§νΌμ μκΈ(μ λμ )λ§ μ§λΆμ΄ κ°λ₯νλ€.

<br>
<br>

#### 1-3. ν΄λΌμ°λμ λ¨μ 

---

- μμ λ§ν μ₯μ μ΄ λλ ·ν ν΄λΌμ°λ μ»΄ν¨νμ΄μ§λ§, μ΄λ¬ν νκ²½μλ λ¨μ μ μ‘΄μ¬νλ€.

- ν΄λΌμ°λ μ κ³΅μ(AWS,Google λ±..)μ νκ²½μ λ¬Έμ κ° μμ κ²½μ° ν΄λΉ μλΉμ€ μ¬μ©μλ€μ΄ λͺ¨λ μν₯μ λ°λλ€.

  ![μΏ ν€λ° μ₯μ ](https://user-images.githubusercontent.com/83164003/144698955-79fd690a-ac53-4241-a7f8-3c4f3d3d9298.jpg)

  ν΄λΌμ°λ μλΉμ€μ 100% μμ‘΄νλ κ²½μ°, μ΄μ νκ²½ μμ²΄κ° ν΄λΌμ°λ μ κ³΅μμκ² μ’μλμ΄ λ²λ¦¬λ―λ‘ ν΄λΌμ°λ μλΉμ€μ λ¬Έμ κ° μκΈ°λ©΄ λ΄κ° λ°°ν¬νκ³  κ΄λ¦¬νλ νκ²½μλ μν₯μ΄ λ―ΈμΉλ€.

<br>
<br>

#### 1-4. ν΄λΌμ°λμ λͺ©ν

---

- μ΄λ¬ν ν΄λΌμ°λμ λͺ©νλ λͺ¨λ  κ²μ μλΉμ€ννλ κ²μ λͺ©νλ‘ νλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 14-49-04](https://user-images.githubusercontent.com/83164003/144699128-fba05602-dc78-4b98-aa28-482a49df20d1.png)

  λνμ μΈ ν΄λΌμ°λ μλΉμ€μ ννλ SaaS, IaaS, PaaS μΈ κ°μ§μ΄λ€.

  1. **SaaS** (Software as a Service)

  - ν΄λΌμ°λ μ κ³΅μκ° λΉμ₯ μ¬μ© κ°λ₯ν μννΈμ¨μ΄λ₯Ό μ κ³΅νλ κ²½μ° λλΆλΆ SaaSμ ν΄λΉνλ€.
  - λλ‘­λ°μ€, κ΅¬κΈλλΌμ΄λΈ, λ·νλ¦­μ€ λ±

  2. **PaaS** (Platform as a Service)

  - ν΄λΌμ°λ μ κ³΅μκ° λ°μ΄ν°λ² μ΄μ€, κ°λ° νλ«νΌκΉμ§ μ κ³΅νλ κ²½μ° λλΆλΆ PaaSμ ν΄λΉνλ€.
  - Oracle Cloud νλ«νΌ λ±

  3. **IaaS** (Infrastructure as a Service)

  - ν΄λΌμ°λ μ κ³΅μκ° κ°μ μ»΄ν¨ν°κΉμ§ μ κ³΅νλ κ²½μ° λλΆλΆ IaaSμ ν΄λΉνλ€.
  - AWS λ±

<br>
<br>

### 2. AWS λ°°ν¬ μ€μ΅

---

- ν΄λΌμ°λ μ»΄ν¨νμ κ°λμ λν΄μλ νμ΅νμΌλ, μ€μ  μΉ μ νλ¦¬μΌμ΄μμ λ°°ν¬νλ κ³Όμ μ κ°λ¨ν μ€μ΅ν΄λ³΄μ.

<br>
<br>

#### 2-1. λ°±μλ λ°°ν¬

---

- AWSμμ μλ² λ°°ν¬μ λ€μκ³Ό κ°μ κ³Όμ μ΄ νμνλ€.

  - EC2 μ½μμ ν΅ν΄ EC2 μΈμ€ν΄μ€λ₯Ό μμ±ν΄μΌ νλ€.
  - κ°λ¨ν μλ² μ νλ¦¬μΌμ΄μμ μμ±νκ³  EC2 μΈμ€ν΄μ€μ μ½λλ₯Ό λ°°ν¬ν΄μΌ νλ€.
  - μλ²λ₯Ό μ€νμν€κ³  λΈλΌμ°μ μμ μλ²μ μ μν  μ μμ΄μΌ νλ€.

<br>
<br>

##### EC2 μΈμ€ν΄μ€ μμ±

---

- AWS λ©λ΄μμ EC2 μλΉμ€λ₯Ό κ²μνκ³  μ μνμ¬ μΈμ€ν΄μ€ μμ λ²νΌμ ν΄λ¦­νμ¬ μΈμ€ν΄μ€ μμ±μ μμνμ.

  ![μ€ν¬λ¦°μ·, 2021-12-04 15-30-52](https://user-images.githubusercontent.com/83164003/144700723-1894003b-df7b-473e-850b-e5338ce795bc.png)

- μ©λμ λ§κ² AMIλ₯Ό μ ννλ κ³Όμ μ΄λ€. νΈνμ± μ΄μ λ° νλ¦¬ν°μ΄ μ§μμ¬λΆλ₯Ό κ³ λ €νμ¬ ubuntu 18.04 λ²μ μ μ νν΄μ£Όμ.

  ![μ€ν¬λ¦°μ·, 2021-12-04 15-54-09](https://user-images.githubusercontent.com/83164003/144700759-56e500b3-fb45-4f2e-b189-eb21bec1216b.png)

- μΈμ€ν΄μ€ μ νμ μ ννλ κ³Όμ μ΄λ€. μμ±νλ μΈμ€ν΄μ€μ CPU, RAM, μ©λμ λν μ νμ΄ κ°λ₯νμ§λ§.. νλ¦¬ν°μ΄κ° μ§μλλ μ νμ μ ννμ. ~~(λ¨ 1GBμ€ν..??)~~

  ![μ€ν¬λ¦°μ·, 2021-12-04 15-56-28](https://user-images.githubusercontent.com/83164003/144700808-a896fbdd-5503-4758-8419-61b55a5ec6ba.png)

- κ²ν  λ° μμ λ²νΌμ ν΄λ¦­νλ©΄ μ΄μ  μΈμ€ν΄μ€λ₯Ό μκ²©μΌλ‘ μ μ΄νκΈ° μν΄μ λ³΄μν€λ₯Ό μ ννκ±°λ(κΈ°μ‘΄μ ν€κ° μλ κ²½μ°) μλ‘ μμ±νλΌλ μλ΄νλ©΄μ΄ λμ¨λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-01-01](https://user-images.githubusercontent.com/83164003/144700959-43b75f01-a9e6-4985-b543-f6525b25a22e.png)

  ν€ νμ΄ λ€μ΄λ‘λλ₯Ό ν΄μ€λ€ λ΄ λ‘μ»¬ PCνκ²½μ λ³΄κ΄ν΄μ£Όμ.

  ν΄λΉ κ³Όμ μΌλ‘ μμ±λλ ν€λ‘ μΈμ€ν΄μ€λ₯Ό SSH\* μ°κ²°μ ν΅ν΄ μκ²©μΌλ‘ μ μ΄ν  μ μλ€.

  > **SSH νλ‘ν μ½**μ΄λ?
  >
  > SSHλ μλ‘ λ€λ₯Έ PCκ° μΈν°λ·κ³Ό κ°μ Public Networkλ₯Ό ν΅ν΄ ν΅μ μ ν  λ λ³΄μμ μμ νκ² ν΅μ μ νκΈ° μν ν΅μ  κ·μ½μ΄λ€.
  >
  > μ£Όκ³ λ°λ λ°μ΄ν°λ₯Ό μνΈνν΄μ ν΄λΉ ν€ νμ΄λ₯Ό κ°μ§μ§ μμ μ¬λμ ν΅μ λλ λ°μ΄ν°λ₯Ό μμλ³Ό μ μκΈ° λλ¬Έμ λ³΄μμ μμ ν ν΅μ  λ°©λ²μ΄λ€.

- μΈμ€ν΄μ€ μμ± λ§μ§λ§ λ¨κ³μμ λ€μ΄λ‘λ ν νμΌμ SSH ν΅μ μ μν ν€ νμ΄ μ€ νλΌμ΄λΉ ν€κ° κΈ°λ‘λ νμΌμ΄λ€. (.pem νμ₯μλ₯Ό κ°μ§κ³  μλ€.)

  ν΄λΉ ν€ νμ΄ νμΌμ EC2 μΈμ€ν΄μ€μ μκ²©μΌλ‘ μ°κ²°μ ν λ μ¬μ©νλ μνΈκ° λ΄κΈ΄ νμΌμ΄λ―λ‘ μΈλΆμ λΈμΆμλκ² κ΄λ¦¬μ μ λν΄μΌνλ€.

- μ΄μ  ν΄λΉ ν€λ₯Ό μ΄μ©νμ¬ SSH μκ²© μ°κ²°λ‘ μμ±ν μΈμ€ν΄μ€λ‘ λ€μ΄κ° λ³΄μ.<br>
  μμ±ν μΈμ€ν΄μ€μ μμ΄λλ₯Ό λλ₯΄λ©΄ μΈμ€ν΄μ€ μμΈμ λ³΄λ₯Ό λ³Ό μ μλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-09-02](https://user-images.githubusercontent.com/83164003/144701274-8beecce2-e522-43ad-b4c8-0769c5674cd3.png)

  κ·Έ λ€ μ°κ²° ν­μ λλ₯΄λ©΄ μΈμ€ν΄μ€μ μ μνλ μ΅μλ€μ μ νν  μ μκ²λλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-16-59](https://user-images.githubusercontent.com/83164003/144701333-eca5e982-dc85-430b-a505-0f6f0ac08bfb.png)

  μ°λ¦° SSH λ°©μμΌλ‘ μ°κ²°ν  μμ μ΄λ―λ‘ SSH ν΄λΌμ΄μΈνΈ ν­μ λλ¬ μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-18-19](https://user-images.githubusercontent.com/83164003/144701373-07137bd2-a4c3-4f25-a6d2-16819ce12f76.png)

- SSHνλ‘ν μ½μ μ΄μ©νλ©΄ λ‘μ»¬ ν°λ―Έλ νκ²½μΌλ‘ ν΄λΌμ°λ μ»΄ν¨ν μΈμ€ν΄μ€μ μ°κ²°μ΄ κ°λ₯νλ€.<br>
  λ€λ§, λ€μ΄λ‘λνλ ν€ νμ΄ νμΌ(.pem)μ΄ λκ΅¬λ μ κ·Όν  μ μλ κΆνμ΄ λΆμ¬λμ΄ μλ€λ©΄ μΈμ€ν΄μ€λ μ°κ²°μ κ±°λΆνλ€.

  κ·Έλ¬λ―λ‘ λ€μ΄λ‘λ νλ ν€ νμ΄ νμΌμ΄ μμΉμ λλ ν λ¦¬ μμΉμμ ν°λ―Έλ νκ²½μΌλ‘ ν΄λΉ ν€ νμ΄ νμΌμ κΆνμ μμ ν΄μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-21-01](https://user-images.githubusercontent.com/83164003/144701462-f4a77d39-8ffb-400c-b005-5f7caf2a29a5.png)

  ν€ νμ΄ νμΌ(.pem)μ κΆνμ μμ νμ§ μμ κ²½μ°, κΆνμ΄ λλ¬΄ open λμ΄ μλ€λ κ²½κ³  λ©μμ§μ ν¨κ» μ μμ΄ κ±°μ λλ€.

- μ΄μ  ν€ νμ΄λ₯Ό μλ§μ κΆνμΌλ‘ μ¬μ©νμ¬ SSH νλ‘ν μ½ νκ²½μΌλ‘ EC2 μΈμ€ν΄μ€λ‘ μκ²© μ μμ΄ κ°λ₯νκ² λͺ¨λ μ€μ μ΄ μλ£λμλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-25-49](https://user-images.githubusercontent.com/83164003/144701564-dba0f2fd-5448-4861-8a05-857c0ad6bd23.png)

  μ λͺλ Ήμ΄λ₯Ό ν΅ν΄ λ΄ λ‘μ»¬ λλ ν λ¦¬(ν€νμ΄κ° λ€μ΄μλ λλ ν λ¦¬)μμ ν°λ―Έλ νκ²½μμ μΈμ€ν΄μ€λ‘ μ μμ μλνλ©΄ μλμ κ°μ μΈμ€ν΄μ€ μκ²© μ μ νλ©΄μ λ³Ό μ μλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-25-28](https://user-images.githubusercontent.com/83164003/144701568-d58f3d8e-3442-4173-8605-57d8bec8e23f.png)

<br>
<br>

##### VSCodeλ₯Ό μ΄μ©ν SSH μκ²© μ μ

---

- μμ κ°μ΄ ν°λ―Έλ νκ²½μΌλ‘λ μΈμ€ν΄μ€μ μ μνμ¬ μΆ©λΆν μ‘°μμ΄ κ°λ₯νμ§λ§ λΆνΈνλ€.

  μλ¬΄λλ GUIλ₯Ό ν΅ν μ¬μ©μμκ² νΈν μ‘°μλ°©μκ³Όλ κ±°λ¦¬κ°λ¨Ό λͺλ Ήμ΄λ‘λ§ μλνλ λ°©μμ΄κΈ°λλ¬Έμ΄λ€.

- VSCode νμ₯ ν΄μΈ **Remote Development**λ₯Ό μ΄μ©νλ©΄, νΈλ¦¬νκ² SSH μκ²© μ μμ΄ κ°λ₯νλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-32-03](https://user-images.githubusercontent.com/83164003/144701685-13cb8b99-819b-4e55-ad09-76acab052d54.png)

  μμ λ νμ₯ ν΄μ λ°μμ£Όλ©΄, VSCode μ’μΈ‘ ν΄μ λ€μκ³Ό κ°μ μκ²© νμκΈ° μμ΄μ½μ΄ μμ±λ κ±Έ νμΈν  μ μλ€.

  <center><img src="https://user-images.githubusercontent.com/83164003/144701727-bf2ea8a2-923c-4af9-8a80-8deb59c595e5.png"/></center>

- μ΄μ  SSH Configure λ‘ κ°μ μκ²©μ μμ μν μ€μ μ ν΄μ£Όμ

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-42-57](https://user-images.githubusercontent.com/83164003/144701931-6d64efc3-b774-4cad-bb1d-9f03ad3c0166.png)

  - **Host** : μνλ μλ¬΄ Host λͺμ μλ ₯ν΄μ£Όμ, VSCodeμμ κ΅¬λΆνκΈ° μν μ΄λ¦μ΄λ€.
  - **HostName** : EC2 νΌλΈλ¦­ DNS, μκ²© μ μν  EC2 μΈμ€ν΄μ€μ μ£Όμμ΄λ€.
  - **User** : μλ² μ μ κ³μ λͺμ μλ ₯ν΄μ£Όμ.
  - **IdentityFile** : .pem ν€ νμ΄κ° λ΄κΈ΄ λλ ν λ¦¬ μμΉλ₯Ό μλ ₯ν΄μ£Όμ.

- μ¬λ°λ₯΄κ² SSH νκ²½ μ€μ μ΄ μλ£λλ©΄ VSCodeμμ EC2 μΈμ€ν΄μ€λ‘ μκ²© μ μμ΄ κ°λ₯νκ² λλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-04 16-51-37](https://user-images.githubusercontent.com/83164003/144702113-29bd3c71-b164-43d7-bfe0-c70f25359286.png)

  λ‘μ»¬ ν°λ―Έλ νκ²½λ³΄λ€λ ~~ν¨μ¬~~ νΈνκ² ν΄λ λ° νμΌ μμ μ ν  μ μκ² λλ€.

<br>
<br>

##### EC2 μΈμ€ν΄μ€ μμμ μλ² μ€ν

---

- μ΄μ  μμ±λ EC2 μΈμ€ν΄μ€λ ubuntu 18.04 μ΄μμ²΄μ κ° νμ λ νν λΉ κ°μ PCμ΄λ€.

  ν΄λΉ μΈμ€ν΄μ€λ₯Ό μλ²κ° κ΅¬λλ  μ μλ κ°λ°νκ²½μ κ΅¬μ±νμ¬ μΈμ€ν΄μ€μμ μλ²λ₯Ό κ΅¬λμν€λ λ°©μμ λ‘μ»¬ κ°λ°νκ²½μ κ΅¬μΆνλ λ°©μκ³Ό λμΌνλ―λ‘ μλ΅νλλ‘ νκ² λ€.

- Github Repositoryμμ κ°μ Έμ¬ μλ²νκ²½μ κ°λ΅ν μ€λͺνμλ©΄, HTTP λ°©μμΌλ‘ 80λ² ν¬νΈλ₯Ό μ¬μ©νλ μλ²μ΄λ©°, κ° μλν¬μΈνΈλ‘μ μμ²­μ λ€μκ³Ό κ°μ΄ μ²λ¦¬λλ€.

  - `/` : GET μμ²­

  ```js
  app.get('/', (req, res) => {
    res.status(201).send('Hello World');
  });
  ```

  μλ΅μ½λ 201λ²μΌλ‘ 'Hello World' μλ΅ λ©μΈμ§λ₯Ό λ³΄λ΄μ£Όλ κ°λ¨ν κ΅¬μ‘°μ΄λ€.

  - `/signin` : POST μμ²­

    ```js
    app.post('/signin', (req, res) => {
      const { username, password } = req.body;
      if (username === 'κΉμ½λ©' && password === '1234') {
        const accessToken = jwt.sign({ username }, 'secretKey', { expiresIn: '1days' });
        res.status(201).send(accessToken);
      } else {
        res.status(401).send('Login Failed');
      }
    });
    ```

    `req.body`μ λ΄κΈ΄ username, passwordκ° κ°κ° 'κΉμ½λ©', '1234'μΈ κ²½μ° `accessToken`μ μμ±νμ¬ (μ ν¨κΈ°κ° 1μΌ) μλ΅μ½λμ ν ν°μ λ΄μ μ λ¬ν΄μ£Όλ κ΅¬μ‘°μ΄λ€.

  - `/status` : GET μμ²­

    ```js
    app.get('/status', authToken, (req, res) => {
      if (req.username) {
        // jwt ν ν°μ΄ μ‘΄μ¬ν  κ²½μ° λ°μ΄ν°λ² μ΄μ€ μ°κ²° μ¬λΆ μ‘°ν
        db.query('use test', (err) => {
          if (err) {
            return res.status(200).send({
              isLogin: true,
              isConnectedToDatabase: false,
            });
          }
          return res.status(200).send({
            isLogin: true,
            isConnectedToDatabase: true,
          });
        });
      }
    });
    ```

    λ‘κ·ΈμΈμ μ±κ³΅μ DB μ°κ²° μ¬λΆμλ°λΌ λ€λ₯Έ κ²°κ³Όλ₯Ό λ³΄μ¬μ£Όλ λ§μ§λ§ μλν¬μΈνΈμ΄λ€.

- μ accessTokenμ λ‘μ»¬ μ€ν λ¦¬μ§μ λ΄κΈ°λ©°, μΈμ¦μ μμ΄ 80λ² ν¬νΈμμ HTTP λ°©μμΌλ‘ μλ²κ° κ΅¬λλλ κ΅¬μ‘°λ₯Ό νμΈνμλ€.

<br>
<br>

##### Security Group

---

- μ΄μ  μλ²λ₯Ό VSCode SSH μκ²© μ μνκ²½μμ μ€νμμΌμ£Όλ©΄ 80λ² ν¬νΈλ‘ μλνλ κ±Έ νμΈ ν  μ μλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-03-56](https://user-images.githubusercontent.com/83164003/144842989-885e45e8-6253-4840-9a3e-70cb38ba9534.png)

  AWS EC2 μΈμ€ν΄μ€λ‘ μ μνμ¬ λΆμ¬λ νΌλΈλ¦­ IPv4 DNS μ£Όμλ‘ μ κ·Όμ νλ©΄ λ€μκ³Ό κ°μ λλ©μΈ μ μ λΆκ° μλ¬μ½λλ₯Ό νμΈ ν  μ μλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 20-58-52](https://user-images.githubusercontent.com/83164003/144843062-c3626eaf-28e0-488e-a854-c328b2b4e425.png)

  μμ§ μΈμ€ν΄μ€ μΈλΆ μ κ·Όμ μν **λ³΄μ κ·Έλ£Ή** μ€μ μ νμ§ μμκΈ° λλ¬Έμ΄λ€.

- λ³΄μ κ·Έλ£Ή(Security Group)μ μ°λ¦¬κ° AWSμμ μλν μΈμ€ν΄μ€μ κ°μ λ°©νλ²½μ΄λ€.

  μΈμ€ν΄μ€λ‘ λ€μ΄κ°λ νΈλν½μ μ μ΄νλ μΈλ°μ΄λ μ€μ κ³Ό μΈμ€ν΄μ€μμ λκ°λ νΈλν½μ μ μ΄νλ μμλ°μ΄λ μ€μ  λκ°μ§ λ³΄μκ·Έλ£Ή μ€μ μ΄ μ‘΄μ¬νλ€.

- μμλ°μ΄λμ defaultκ°μ EC2 μΈμ€ν΄μ€μμ μΈλΆλ‘ λκ°λ λͺ¨λ  νΈλν½μ΄ νμ©λλ―λ‘, μ°λ¦¬λ μΈλΆμμ μ κ·Όνλ μΈλ°μ΄λ μ€μ λ§ ν΄μ£Όλ©΄λλ€.

  νμ¬ μΈμ€ν΄μ€μ λ³΄μκ·Έλ£ΉμΌλ‘ λ€μ΄κ°μ£Όμ.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-13-26](https://user-images.githubusercontent.com/83164003/144844163-2a4c413b-9cb5-443f-a0f0-cabc9acca5da.png)

  μΈλ°μ΄λ/ μΈλ°μ΄λ κ·μΉ νΈμ§μ ν΄λ¦­ ν λ€μκ³Ό κ°μ΄ 80λ² ν¬νΈμ μΈλ°μ΄λ κ·μΉμ μ€μ ν΄μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-15-10](https://user-images.githubusercontent.com/83164003/144844679-54838d26-e4c0-48b8-819c-63b59f54d749.png)

  μ΄μ  μΈμ€ν΄μ€μμ μλ²κ° μΌμ§ μνμμ λ€μ νΌλΈλ¦­ IPv4 DNS μ£Όμλ‘ μ μμ 'Hello World' λ¬Έκ΅¬λ₯Ό νμΈ ν  μ μλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-21-45](https://user-images.githubusercontent.com/83164003/144845244-a7759042-6b95-4734-a2db-86e47bfafa49.png)

<br>
<br>

##### μλ² λ°±κ·ΈλΌμ΄λ μ€ν

---

- SSH νλ‘μΈμ€λ κ°μ  μ’λ£ μ(λ‘μ»¬ νκ²½ ν°λ―Έλ μ’λ£μ), EC2 μμ νλ‘μΈμ€λ κ°μ΄ μ’λ£λλ€.

  κ·Έλ¬λ―λ‘ μ°λ¦¬λ SSH νλ‘μΈμ€κ° μ’λ£λλλΌλ μλ²κ° EC2 λ°±κ·ΈλΌμ΄λμμ μλνκ²λ νλ‘κ·Έλ¨μ μ€νν΄μ€μΌ νλ€.

- Linux/Unix κ³μ΄ μ΄μμ²΄μ μμλ `&`λΌλ ν€μλλ₯Ό λΆμ¬μ νλ‘κ·Έλ¨ μ€νμ λ°±κ·ΈλΌμ΄λ μ€νμΌλ‘ λ§λ€μ΄μ€ μ μλ€.

  ```
  $ node index.js &
  ```

  μ λͺλ Ήμ΄λ₯Ό μ¬μ©νμ¬ μλ²λ₯Ό μλμμΌμ£Όμ

  - λ°λλ‘ μλ²λ₯Ό μ’λ£νκ³  μΆλ€λ©΄ kill λͺλ Ήμ ν΅ν΄ λ°±κ·ΈλΌμ΄λμμ μ€νμ€μΈ νλ‘μΈμ€λ₯Ό μ’λ£ν  μλ μλ€.

<br>
<br>

#### 2-2. νλ‘ νΈμλ λ°°ν¬

---

- νλ‘ νΈμλλ S3 λ²ν·μ μ΄μ©νμ¬ ν΄λΌμ΄μΈνΈκ° λ΄κΈ΄ μ μ  μΉ μ¬μ΄νΈλ₯Ό νΈμ€ν ν΄μ£Όμ΄μΌ νλ€.

<br>
<br>

##### S3 λ²ν· μμ±

---

- μ΄μ  AWS ννμ΄μ§μ S3 λ²ν·μΌλ‘ μ μ ν, λ²ν·λ§λ€κΈ°λ‘ λ²ν·μ μμ±ν΄ μ£Όμ.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-38-12](https://user-images.githubusercontent.com/83164003/144847449-208d76c3-4155-4c3e-98a5-4781b88caf4c.png)

  λ²ν·μ΄λ¦μ μ€μ ν΄μ€μΌνλ€.<br>
  λ€λ§, ν λ¦¬μ μλ νλμ λ²ν·μ΄λ¦λ§ μμ±μ΄ κ°λ₯νλ€. μ€λ³΅μ΄ λΆκ°λ₯νλ―λ‘ κ³ μ ν λ²ν·λͺμ μ μ΄μ£Όκ³  λ³λ€λ₯Έ μ€μ μμ΄ μΈμ€ν΄μ€μ κ°μ λ¦¬μ μμ λ²ν·μ μμ±ν΄ μ£Όμ.

- μ΄μ  λ§λ€μ΄μ§ λ²ν·μ μ΄λ¦μ ν΄λ¦­νμ¬ μμ± λ©λ΄λ‘ μ§μ ν, μ μ  μΉ μ¬μ΄νΈ νΈμ€ν λ©λ΄λ‘ λ€μ΄κ° μλμ κ°μ΄ μμ ν΄ μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-41-05](https://user-images.githubusercontent.com/83164003/144847908-0d550aa1-58e6-4628-8f92-3054ed94fb0e.png)

  μ μ  μΉμ¬μ΄νΈ νΈμ€νμ νμ±νλ₯Ό λ²νΌμ λλ¬μ£Όλ©΄, μΈλ±μ€ λ¬Έμλ± μ¬λ¬ μ΅μ μ νμ°½μ΄ λμ¨λ€.

  ν΄λΉ λ²ν· μΉ μ¬μ΄νΈ μ£Όμμ μ²μ μ μνμ λ λ³΄μΌ κΈ°λ³Έ νμ΄μ§λ₯Ό μ§μ ν΄μ£Όλ μ΅μκ³Ό νΉμ λͺ¨λ₯Ό μ€λ₯ λ°μ μ λ©μΈ νμ΄μ§λ₯Ό λ°ννκΈ° μν΄μ **index.html**μ κΈ°μν΄ μ€λ€.

- μ΄μ  ν΄λΌμ΄μΈνΈλ₯Ό λ΄μ S3 λ²ν·μ΄ μμ±λμλ€. λ²ν· μμ± λ©λ΄ μ§μ ν λ²ν· μΉ μ¬μ΄νΈ μλν¬μΈνΈλ‘ μ μνλ©΄ μ΄μ  μ°λ¦¬κ° λ§λ  λ²ν· μμ­μΌλ‘ μ μμ΄ κ°λ₯νλ€.

  --![μ€ν¬λ¦°μ·, 2021-12-06 21-46-35](https://user-images.githubusercontent.com/83164003/144848531-bef2e5b4-849c-4e68-9ed8-4663c8f69c42.png)

  μ΄μ  λ²ν·μ μ μ  μΉ νμ΄μ§ νμΌμ μμ§ μλ‘λ νκ³ , νΌλΈλ¦­ μ‘μΈμ€ μ€μ  λ³κ²½κ³Ό μ μ± μμ±μ ν΄μ£Όλ©΄ ν΄λΌμ΄μΈνΈκ° μΉ μμ νΈμ€νλκ² λλ€.

<br>
<br>

##### λ²ν·μ μΉ νμ΄μ§ νμΌ μλ‘λ

---

- μ°μ  `im-sprint-practice-deploy`/`client`/`.env.example` νμΌμ VSCode SSH νκ²½μΌλ‘ μ μνμ¬ μλ²μ μ£Όμ(νΌλΈλ¦­ IPv4 DNS μ£Όμ)λ‘ νκ²½λ³μ μ€μ μν΄μ€λ€.
- νκ²½ λ³μ κ΄λ ¨ μ€μ μ΄ μλ£ ν, client λλ ν λ¦¬μμ ν°λ―Έλ `npm run build` λͺλ Ήμ΄λ₯Ό ν΅ν΄ λΉλ νμΌμ μμ±ν΄μ£Όμ.

  <center><img src="https://user-images.githubusercontent.com/83164003/144846947-945598bf-cf0d-4e6c-8553-8cd8e08f5206.png"/></center><br>

  λΉλκ° μ±κ³΅νλ©΄, μμ κ°μ ν΄λκ° μμ±λλ€.

  μ΄ λΉλλ νμΌλ€μ λ²ν·μ μ¬λ €μ£Όμ΄μΌ νλ€.

- μ΄μ μ μμ±ν S3 λ²ν·μ ID ν΄λ¦­ ν κ°μ²΄ λ©λ΄μ μλ‘λλ₯Ό μ νν΄ μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-52-48](https://user-images.githubusercontent.com/83164003/144849536-07c7600d-a8f1-46a0-ba5f-84fd21368ac4.png)

  μμ κ°μ νλ©΄μ΄ λμ€λ©΄ λ°©κΈ λΉλλ ν΄λλ₯Ό μλ‘λ ν΄μ€λ€.

  EC2 μΈμ€ν΄μ€μμ λΉλλ νμΌμ λ‘μ»¬νκ²½μΌλ‘ κ°μ Έμ€λ €λ©΄ VSCode SSH μ°κ²°μ΄ λμ΄μλ€λ©΄ μ΄λν  λλ ν λ¦¬ μ°ν΄λ¦­ ν λ€μ΄λ‘λνμ¬ λ‘μ»¬νκ²½μΌλ‘ κ°μ Έμ¬ μ μλ€.

  <center><img src="https://user-images.githubusercontent.com/83164003/144849810-2c2ef28e-b132-4ba1-b7d8-1fc509388a3e.png"/></center>

- μ΄μ  λ²ν·μ μΉ νμ΄μ§ νμΌκΉμ§ λͺ¨λ μλ£λμμΌλ, λ²ν·μΌλ‘ μ κ·Ό κΆν μ€μ κ³Ό λ²ν· μ μ± μμ±μ ν΄μ£Όμ΄μΌ νλ€.

<br>
<br>

##### λ²ν· κΆν μ€μ 

---

- μ΄μ  λ²ν· λ©λ΄μ€ κΆν λ©λ΄λ‘ λ€μ΄ κ° λ€, νΌλΈλ¦­ μ‘μΈμ€ μ°¨λ¨(λ²ν· μ€μ ) νΈμ§μ ν΄ μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 21-58-35](https://user-images.githubusercontent.com/83164003/144850311-b24597c9-cb40-453a-bc2d-bca7f2bdfa58.png)

  λͺ¨λ  νΌλΈλ¦­ μ‘μΈμ€ μ°¨λ¨ μ΅μμ μ²΄ν¬ λ°μ€λ₯Ό ν΄μ ν΄ μ€λ€.

  κ·Έλ¦¬κ³  μ΄μ  λ²ν· μ μ±μ μ€μ ν΄ μ£Όμ΄μΌ νλ€.<br>
  λ²ν· μ μ± νΈμ§ λ²νΌμΌλ‘ λ€μ΄ κ° λ€ λ²ν· ARNμ λ³΅μ¬ ν λ²ν· μ μ± μμ±κΈ°λ‘ λ€μ΄κ°λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-02-02](https://user-images.githubusercontent.com/83164003/144850714-ab4956d8-44cc-400e-b88f-049715b544d1.png)

  μ μ± μμ±κΈ°μ μ μ ν μλ μ¬μ§κ³Ό κ°μ΄ μ μ±μ μμ±ν΄ μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-03-25](https://user-images.githubusercontent.com/83164003/144850969-0fae56c2-dd48-4ce4-9088-e7214f893f60.png)

  μμμ λΆν° μ°¨λ‘λλ‘ `S3 Bucket Policy` μ ν ν Effectλ Allowλ‘ κΈ°λ³ΈμΌλ‘ μ²΄ν¬λμ΄ μλ€.

  Principalμ `*`μ μλ ₯ ν΄ μ€ λ€, Actionsμμλ `GetObject`1κ°μ§ μ‘μλ§ μ ννλ€.

  λ§μ§λ§μΌλ‘ Amazon Resource Name (ARN)μ λ―Έλ¦¬ λ³΅μ¬ν λ΄ λ²ν· ARNμ λ³΅μ¬ ν `/*`λ₯Ό λ€μ λΆμ¬μ μλ ₯ν΄ μ€λ€ μ μ±μ μμ±ν΄μ€λ€.

- μμ±λ μ μ±μ λ΄ λ²ν· μ μ±μ λΆμ¬λ£κΈ°λ‘ λ£μ΄ μ€ λ€,

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-09-59](https://user-images.githubusercontent.com/83164003/144851729-9f691a45-7f36-4b3d-9890-11b4a0d6dd9d.png)

  EC2 μΈμ€ν΄μ€μμ μλ²κ° μ μμ€μΈ μνμμ λ²ν· μλν¬μΈνΈλ‘ μ μν΄ μ£Όλ©΄ λ€μκ³Ό κ°μ νλ©΄μ νμΈ ν  μ μλ€.

  <img width="795" alt="wUMGKH3xh-1618474509693" src="https://user-images.githubusercontent.com/83164003/144852123-c05b18d2-5899-42fb-96c6-33b9b4bc30ff.png">
  <img width="746" alt="ssWhmZWQO-1618474630640" src="https://user-images.githubusercontent.com/83164003/144852104-07bddf18-a447-42a7-92eb-d2551b95fc2b.png">

<br>
<br>

#### 2-3. λ°μ΄ν°λ² μ΄μ€ μ°κ²°

---

- MySQL λ°μ΄ν°λ² μ΄μ€ μμ§μ μ¬μ©νλ DB μΈμ€ν΄μ€λ₯Ό μμ±ν λ€ EC2 μΈμ€ν΄μ€μ ν΄λΉ DBλ₯Ό μ°κ²°νλ κ³Όμ μΌλ‘ μμ±λλ€.

<br>
<br>

##### RDS μΈμ€ν΄μ€ μμ±

---

- AWS RDS λ©λ΄λ‘ μ§μ ν λ°μ΄ν°λ² μ΄μ€λ₯Ό μμ±ν΄μ£Όμ.

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-24-58](https://user-images.githubusercontent.com/83164003/144853927-fe77299c-62c3-4a32-84ef-e2cf0e54a8ed.png)

  μμ§μ΅μμ MySQLμ μ ν ν νλ¦¬ν°μ΄λ‘ μ ννλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-26-49](https://user-images.githubusercontent.com/83164003/144854149-c8db7da3-c542-47fe-995c-a3f7398ed993.png)

  μκ²©μ¦λͺ μ΅μμμλ λ§μ€ν° μ¬μ©μ μ΄λ¦ μ€μ κ³Ό 8μλ¦¬ μ΄μμ μ¬μ©μ λΉλ°λ²νΈλ₯Ό μ€μ ν΄ μ£Όμ. (λ§μ€ν° μ¬μ©μ μ΄λ¦κ³Ό λΉλ°λ²νΈλ λμ€μ λ°μ΄ν°λ² μ΄μ€λ₯Ό μ°κ²°ν  λ μ°μ΄λ μ λ³΄μ΄λ€.)

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-29-10](https://user-images.githubusercontent.com/83164003/144854487-8193fb95-f817-40b9-8ac8-97b98d0d4d73.png)

  μ°κ²° μ΅μμμλ νΌλΈλ¦­ μ‘μΈμ€λ₯Ό "μ"λ‘ λ³κ²½ν΄ μ€ λ€,

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-30-28](https://user-images.githubusercontent.com/83164003/144854619-38337e5f-cee5-49d3-9f05-cebc0a56a7d5.png)

  μΆκ°κ΅¬μ±μΌλ‘ κ°μ ν¬νΈλ²νΈλ₯Ό 13306λ²μΌλ‘ λ³κ²½ν΄ μ£Όμλ€. (νν μ¬μ©λλ 3306λ² ν¬νΈ λμ , ν¬νΈλ²νΈ λΈμΆμ λ°©μ§νλ €λ λͺ©μ μΌλ‘ 13306λ² ν¬νΈλ₯Ό μ¬μ©νμλ€.)

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-31-38](https://user-images.githubusercontent.com/83164003/144854825-e076124f-a9cf-4829-b8a0-7199f379ac2c.png)

  λ§μ§λ§μΌλ‘ μλ²μμ μ°κ²°λ DB μ΄κΈ°κ°μ΄ test μ΄λ¦μ΄λ―λ‘ μ΄κΈ° λ°μ΄ν°λ² μ΄μ€ λͺμΉ­μ testλ‘ μ£Όμλ€. (μλ΅ ν MySQL μ μ ν CREATE DATABASE testλ₯Ό μ€νν΄ μ£Όμ΄λ λλ€.)

- μ κ³Όμ μ λ§μΉλ©΄ DB μμ±μ΄ μ§νλλ€.

  μμ±μ΄ λͺ¨λ μλ£λλλ° μκ°μ 2~30λΆμ λ μμλλλ― νλ€.

- μμ±μ΄ μλ£λλ©΄ DB μΈμ€ν΄μ€ μμ΄λ ν΄λ¦­ ν μ°κ²°&λ³΄μμ DB μλν¬μΈνΈ μ£Όμλ₯Ό λ³΅μ¬ν΄μ€λ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-35-26](https://user-images.githubusercontent.com/83164003/144855391-157d300c-7948-487f-bea5-37e4061615ed.png)

  MySQLμ΄ μ€μΉλ νκ²½μμ `mysql -u [λ§μ€ν° μ΄λ¦] --host [μλν¬μΈνΈ μ£Όμ] -P 13306(ν¬νΈλ²νΈ) -p` λͺλ Ήμ΄λ₯Ό μλ ₯ ν λ§μ€ν° μ¬μ©μ μ΄λ¦κ³Ό λΉλ°λ²νΈλ₯Ό μλ ₯νλ©΄ DB μΈμ€ν΄μ€λ‘ μ μμ΄ κ°λ₯νλ€.

  ![μ€ν¬λ¦°μ·, 2021-12-06 22-40-02](https://user-images.githubusercontent.com/83164003/144856074-398eb02c-788f-4140-ab9e-28f0e70db7f7.png)

  μ΄κΈ° λ°μ΄ν°λ² μ΄μ€μΈ testκ° νμΈλλ©΄ μλ£μ΄λ€.

<br>
<br>

##### RDS μΈμ€ν΄μ€ μ°κ²°

---

- EC2 μΈμ€ν΄μ€μμ μ€νλκ³  μλ μλ²λ, κ·Έ μμ²΄λ‘λ μλνκ³  μμ§λ§, μμ§ λ°μ΄ν°λ² μ΄μ€μ μ°κ²°μ μλμ΄ μλ€.

  μλ²μ νκ²½ μ€μ μ ν΅ν΄μ μμμ μμ±ν RDS μΈμ€ν΄μ€μ μ μ νλ©΄ ν΄λΌμ°λ λ°μ΄ν°λ² μ΄μ€ test DBλ₯Ό μ¬μ©ν  μ μλ€.

- `im-sprint-practice-deploy`/`server`/`db`/`connection.js` νμΌμ νμΈ νλ©΄ μλμ κ°μ μ½λλ₯Ό νμΈ ν  μ μλ€.

  ```js
  const mysql = require('mysql');
  const dotenv = require('dotenv');
  dotenv.config();

  const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  con.connect((err) => {
    if (err) {
      con.end();
    }
  });

  module.exports = con;
  ```

- λ€μ VSCode SSH λ‘ μ μνμ¬ `im-sprint-practice-deploy`/`server`/`.env.example`λ₯Ό μλ§κ² μμ ν΄ μ€ λ€ μλ²λ₯Ό μ¬μμνμ. (`host`λ μμ±ν DB μΈμ€ν΄μ€μ μλν¬μΈνΈ μ£Όμλ₯Ό λ£μ΄μ€λ€.)
- μλ²λ₯Ό λ€μ κ΅¬λν λ€, ν΄λΌμ΄μΈνΈμμ λ‘κ·ΈμΈ νλ©΄ λ€μκ³Ό κ°μ νλ©΄μ νμΈ ν  μ μλ€.

  <img width="634" alt="VJm6oOI7Z-1618494315919" src="https://user-images.githubusercontent.com/83164003/144857364-d63b9472-3a6c-437d-a3cf-08af15e1df17.png">

<br>
<br>

## π€ Understanding

---

- λ°°ν¬...μκ°λ³΄λ€ μ΄λ ΅λ€. μμ§ AWSμμ λ¬΄λ£λ‘ μ κ³΅νλ λλ©μΈμ νΈμ€νλ§ ν΄λ³΄μλ€.

  μ°μ  μ€νλ¦°νΈ λ΄μ©λλ‘ μ λ°λΌλ ν΄μ λ¬Έμ λ λ±ν μμλ€λ§, κ·Έ κ³Όμ μ νΈνκ² νκΈ° μν΄μ VSCodeμμ μ§μνλ SSH μκ²© μ μλ°©μμ μ ννλ€.

  νμ€ν ν°λ―Έλμμλ§ μ‘°μνλ λ°©μλ³΄λ€ λ§μ°μ€λ₯Ό μ΄μ©ν΄μ νΈλ¦¬νκ² μ‘°μν  μ μλ GUI νκ²½μ΄ μ¬λμ΄ μ°κΈ°μ ν¨μ¬ νΈνκ±΄ μ΄μ© μ μλλ―νλ€.

- μνλ λλ©μΈμ κ΅¬λ§€ ν λ°°ν¬νλ κ²κ³Ό HTTPS μΈμ¦λ°©μμ μ¬μ©νλ λ°°ν¬λ°©μμ λμ€μ λ€μ ν΄λ΄μΌκ² λ€.

<br>
<br>

```toc

```
