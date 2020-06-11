# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.1](https://gitlab.com/carvajalluis/node-udemy/compare/v0.0.0...v0.0.1) (2020-06-11)


### Features

* **posts:** graphql posts submmit ([a6b4259](https://gitlab.com/carvajalluis/node-udemy/commit/a6b42593e502d79c346d5b47d60cd16bfdff9ac9))

## 0.0.0 (2020-06-11)


### ⚠ BREAKING CHANGES

* **containers:** all mvc and frontend  into a pwa
* **controller:** you must install all packages using yarn in your console, templates now relay on
pug as a template engine

### Features

* **404 page:** new page not found template ([3565f5e](https://gitlab.com/carvajalluis/node-udemy/commit/3565f5e54b12bd6c3ba9f13f3703a4e6d2bf5116))
* **authentication:** session & cookie management ([64d4a88](https://gitlab.com/carvajalluis/node-udemy/commit/64d4a88c8dd610126250b6b8082889d7ebec2b89))
* **cart:** add product cart to database ([a1a6f3f](https://gitlab.com/carvajalluis/node-udemy/commit/a1a6f3f00dbb73c4bdef6dfb367d1627ad19c0b7))
* **cart & orders:** add cart and create order now with  mongodb and mongoose ([6f4a8d6](https://gitlab.com/carvajalluis/node-udemy/commit/6f4a8d6576755e14fd24306db976120f80a69052))
* **cart view:** add the cart view with current items and no interaction yet ([461fb3a](https://gitlab.com/carvajalluis/node-udemy/commit/461fb3ae47208fe28e8619383a07636aabd3b554))
* **controller:** adds getAddProduct page controller endpoint ([2529678](https://gitlab.com/carvajalluis/node-udemy/commit/2529678865a6a5cd2f83cc173dbfc8fb9ad18093))
* **csrf:** integrating csrf for security ([c5ee6f4](https://gitlab.com/carvajalluis/node-udemy/commit/c5ee6f40b738ceb43b1a02ed02dc677ca042cca5))
* **database:** added file management and ORM ([e6af36c](https://gitlab.com/carvajalluis/node-udemy/commit/e6af36c15c0fd46815d3bee54aefb3a142857fe3))
* **dynamic routes & advanced models:** add delete for product and cart and edit for product ([9e19102](https://gitlab.com/carvajalluis/node-udemy/commit/9e1910227f2c458add4007531f71438d49ff5d4d))
* **error controller:** 404 handling with a new error controller ([9264669](https://gitlab.com/carvajalluis/node-udemy/commit/92646690d3dadabdfd7b069f32e35e4c166e1904))
* **error handling:** enabled 500 page to report error from server side ([e309874](https://gitlab.com/carvajalluis/node-udemy/commit/e309874be9d36b2feb40983310e7256a87008d42))
* **fhash messages:** adds user flash messages ([c968d75](https://gitlab.com/carvajalluis/node-udemy/commit/c968d75e3390a2f1dd54eb82407b5c3522cbb30f))
* **gitlab ci:** add ghitlab ci configuration ([164ede1](https://gitlab.com/carvajalluis/node-udemy/commit/164ede148abe1e949eaa8802ec0b800ea13ad720))
* **mobile navigation:** add mobile navigation for better presentation in smaller screens ([c3a5fde](https://gitlab.com/carvajalluis/node-udemy/commit/c3a5fde4a294ec79b5b56e498f0299c689e6f580))
* **mongoose odm:** integrate product and user into mongo ([84a1435](https://gitlab.com/carvajalluis/node-udemy/commit/84a14350d240e32bbe9c799ff317ab5099e9c28b))
* **new product fields:** adds new product fields to include ([e463dcf](https://gitlab.com/carvajalluis/node-udemy/commit/e463dcfbff824fea2a99cd9fc3846a6c928c0ba4))
* **on cascade cart delete product:** delete item from cart when deleted from product list ([a0ea882](https://gitlab.com/carvajalluis/node-udemy/commit/a0ea882573fe2a1e02e28264550482626db83cf4))
* **order route:** add order route ([f752227](https://gitlab.com/carvajalluis/node-udemy/commit/f7522270ddf26a34e9e65f1406dafd094922434a))
* **orders:** add order page and model to handle state ([ae4bba8](https://gitlab.com/carvajalluis/node-udemy/commit/ae4bba8e81273b3ec2d52a6fc2ef1f7c950e5a3d))
* **password encryption:** bcrypt algorithm integration ([fa20668](https://gitlab.com/carvajalluis/node-udemy/commit/fa206680d6bb858032f764bba1edadcaa2d02950))
* **password reset:** include new password reset functionality ([c9085e0](https://gitlab.com/carvajalluis/node-udemy/commit/c9085e0fe61730c9f64d2bcc1d0e142b41759157))
* **product:** add crud to new database ([01843d6](https://gitlab.com/carvajalluis/node-udemy/commit/01843d66da358ceaa734a42a9c6816ae199ebf04))
* **product:** add product assotiation with cart ([7743136](https://gitlab.com/carvajalluis/node-udemy/commit/7743136607d0a36d6e24b15e63678a74d24909bb))
* **product:** added product sequelize model and migration ([7ef5772](https://gitlab.com/carvajalluis/node-udemy/commit/7ef57727bced6158c20a41535d06c248d0f0aa9a))
* **product controller:** new getProduct endpoint added ([f575a14](https://gitlab.com/carvajalluis/node-udemy/commit/f575a14e362accf54e82938a6d3d261cfaec812e))
* **product controller:** new postProduct endpoint ([39d8f83](https://gitlab.com/carvajalluis/node-udemy/commit/39d8f838a95b968eaa07f6e0e3269f485823f7b5))
* **product model:** create new product model to complete MVC ([630f27d](https://gitlab.com/carvajalluis/node-udemy/commit/630f27da1114e72ed391cbf88cc169737778f1c0))
* **sendgrid:** nodemailer sendgrid transport integration ([6a54cdf](https://gitlab.com/carvajalluis/node-udemy/commit/6a54cdf66c6720071c73053bf30000c3bd04e2fe))
* **user:** add user mode to database ([7244f27](https://gitlab.com/carvajalluis/node-udemy/commit/7244f27906eb0fdf3ff43c1848b698ad33556103))


### Bug Fixes

* **cart:** cart delete product issue ([21135de](https://gitlab.com/carvajalluis/node-udemy/commit/21135de3aa80aec068fd431d5d852a0970e5728a))
* **cart:** cart initialization ([9405d79](https://gitlab.com/carvajalluis/node-udemy/commit/9405d796f2a703e8f806a6511a659b2d7049e0b3))
* **cartitem:** migration to allowes update on changes to the quantity ([c1d488e](https://gitlab.com/carvajalluis/node-udemy/commit/c1d488ec95cc72f88f9c9e3a1b9b04c42b9c216d))
* **include missing packages definition:** add dependencies already been used ([e95ec3a](https://gitlab.com/carvajalluis/node-udemy/commit/e95ec3a687ed3a1e45fb8ab207fbb0097fea0428))
* **shop page:** solves issue with lenght of shop store not been an iterable ([3430244](https://gitlab.com/carvajalluis/node-udemy/commit/343024415ca7b4203e3e7df2a9d2717adb4abcbb))


* **containers:** separate frontend & backend ([f4d60ce](https://gitlab.com/carvajalluis/node-udemy/commit/f4d60ceff2ef1e3629efc0f3aeb47c49bdc98fcd))
