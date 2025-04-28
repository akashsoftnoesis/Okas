const constants = require("./constants");

const hardikAsAgent = {
  photo: {
    original: `${process.env.SITE_URL}/uploads/hardik.jpg`,
    thumb_360: `${process.env.SITE_URL}/uploads/hardik.jpg`,
  },
  email: "hardik@okaspropertygroup.com.au",
  phoneNumbers: [
    // {
    //   number: "03 8390 0699",
    //   typeCode: "M",
    //   type: "Mobile",
    //   comment: null,
    // },
  ],
  permissions: {
    accessPropertyManagement: true,
    settings: true,
    globalNotesReadWrite: true,
    deleteContacts: true,
    globalPropertiesRead: false,
    accessAlarmDetails: true,
    accessSales: true,
    globalContactsReadWrite: true,
    accessPropertyFinancials: true,
    globalNotesRead: true,
    globalActionListsReadWrite: true,
    sendSMS: true,
    globalTasksReadWrite: true,
    deleteProperties: true,
    globalPropertiesReadWrite: true,
    canLogin: true,
  },
  staffTypeId: 2,
  profile: null,
  websiteUrl: "",
  username: "hardik.lakhani",
  position: "CEO, Founder & OIEC",
  paAccess: [
    {
      id: 92690,
    },
    {
      id: 97600,
    },
    {
      id: 97602,
    },
    {
      id: 97599,
    },
    {
      id: 92686,
    },
  ],
  adminAccess: true,
  lastLogin: "2021-08-18T03:53:33+00:00",
  lastName: "Lakhani",
  id: 1000000,
  firstName: "Hardik",
  role: "oiec",
  agent_priority: 0,
  description: `Hardik Lakhani wears many hats at OKAS Property Group, but he only has one job – keeping OKAS clients happy. His desire to face new challenges and discover opportunities to learn is what motivated Hardik to move into the Real Estate Business. As the Founder of OKAS, Hardik is purposely pro-active in his approach to ensuring the sales process leads to the final outcome the client seeks! He loves meeting new people, and his friendly and inquisitive nature ensures he has great relationships with all his stakeholders. He prides himself on his personalized service and commitment to people and property.`
};
const agentsStaticData = [
  {
    name: "Nirali Desai",
    description:
      "In addition to helping them find their perfect home, Nirali enjoys building long-lasting and meaningful relationships with her clients. Nirali is driven to not only achieve the best returns for her landlords, but also ensures the perfect tenant for each property in her portfolio. Enthusiastic, honest and reliable, she strives to achieve the very best outcomes for her tenants andlandlords alike.",
    email: "nirali@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/desainily",
    instagram_url: "https://www.instagram.com/niralidesai_okas/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/nirali-desai-ho040/sales/reviews",
    image_name: "nirali.jpg",
  },
  {
    name: "Abhi Mathur",
    description:
      "A genuine passion for property, tireless commitment to his clients and tell-it-like-it-is communication has seen Abhi become one of the rising stars at OKAS Property Group. He approaches each day with an endless supply of energy and a level of motivation that has earned him the respect of vendors and buyers alike. After business hours, you’ll find him spending time with family and friends and enjoying the suburban.",
    email: "abhi@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/abhimathurmelbournerealtor/",
    instagram_url: "https://www.instagram.com/therealestateagent_abhi/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/abhi-mathur-gm324/sales/reviews",
    image_name: "abhi.jpg",
  },
  {
    name: "Anuj Patel",
    description:
      "A high-touch agent known for his knowledge and his unmatched devotion to clients. He earns the respect of his clients by working tirelessly on their behalf and by always offering them candid advice. Anuj is ready to help with your home buying and selling needs. As a proud member of the OKAS family, Anuj Patel carries the values of hard work, integrity, and outstanding client service into everything he does.",
    email: "anuj@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/anujrealtor/",
    instagram_url: "https://www.instagram.com/aj_realtor/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/anuj-patel-gm326/sales/reviews",
    image_name: "anuj.jpg",
  },
  {
    name: "Cindy Phuong",
    description:
      "A local suburb expert, Cindy’s genuine approach to understanding customer requirements makes her a favourite with buyers and sellers alike. Cindy has a sixth sense when it comes to people and property. She is committed to building solid client relationships – based on trust rather than talking the talk – and her many satisfied clients are testament to that. Cindy’s expertise and experience and easy manner mean you too, can benefit as you make your important real estate choices.",
    email: "cindy@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/CindyPhuongRealtor/",
    instagram_url: "https://www.instagram.com/cindyphuong.realestate/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/cindy-phuong-fz471/sales/reviews",
    image_name: "cindy.jpg",
  },
  {
    name: "Ellie Glenn",
    description:
      "A key member of the dynamic rental department at OKAS Property Group, Ellie Glenn  approaches her work with a perfect combination of enthusiasm and professionalism which is admired and respected by her landlords and tenants alike. Confident, caring and always professional, Ellie Glenn sets the benchmark in property management excellence delivering her clients a level of service that few could emulate.",
    email: "ellie@okaspropertygroup.com.au",
    // email: "ire@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/ellie.glenn.77",
    instagram_url: "https://www.instagram.com/ellieglenn7/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agency/okas-property-group-az038/sales/reviews",
    image_name: "ellie.jpg",
  },
  {
    name: "Kuldip Gajera",
    description:
      "Balanced with his aim of striving for the best result for his vendors, the core of Kuldip’s drive is still the unique enjoyment of assisting buyers to secure their dream home. Constant testimonials from vendors and purchasers alike reinforce the incredible ability Kuldip has to connect with people, and in turn connect people with properties. Away from work, Kuldip Gajera is passionate about travel, sport, and socialising with friends and family.",
    email: "kuldip@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/kuldipokaspropertygroup",
    instagram_url: "https://www.instagram.com/kuldip19192/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/kuldip-gajera-gb163/sales/reviews",
    image_name: "kuldip.jpg",
  },
  {
    name: "Neha Chhabra",
    description:
      "'Area Sales Manager is a highly demanding role, but with that comes amazing opportunities to solve problems, explore new ideas and develop meaningful client relationships.' Neha says. Managing her portfolio like every property is her own, she delivers a level of service to her clients that is beyond comparation with outstanding communication skills, administration excellence and an unquenchable drive to deliver the best outcomes possible.",
    email: "neha@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/nehachhabrarealtor/",
    instagram_url: "https://www.instagram.com/neha_chhabra2/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/neha-chhabra-hb858/sales/reviews",
    image_name: "neha.jpg",
  },
  {
    name: "Nirav Patel",
    description:
      "Passionate about working with people, Nirav’s decision to explore the real estate industry garnered immediate success and satisfaction. Determined, thoughtful and results-driven, Nirav Patel has built a reputation based on delivering a premium level of customer service and doing whatever it takes to achieve and exceed the xpectations of his clients. He enjoys exploring all the corners of Victoria and a good overseas trip every now and then.",
    email: "nirav@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/profile.php?id=100029770841713",
    instagram_url: "https://www.instagram.com/okaspropertygroup/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/nirav-patel-hh310/sales/reviews",
    image_name: "nirav.jpg",
  },
  {
    name: "Thao Truong",
    description:
      "Becoming a real estate agent, Thao was able to draw upon his business acumen and exemplary customer service skills to have an immediate impact in the world of property sales. That level of dedication is something that Thao has brought with him to his role as a Area Sales Manager. “I’m passionate about providing clients with the highest level of service, and delivering a superior work ethic that helps people achieve their real estate goals.”Thao explains.",
    email: "thao@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/thaotruongrealestate/",
    instagram_url: "https://www.instagram.com/okaspropertygroup/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/thao-truong-hl195/sales/reviews",
    image_name: "thao.jpg",
  },
  {
    name: "Vish Safi",
    description:
      "'For me, one of the joys of real estate is no two days are ever the same - things can change in a heartbeat' In his current role as Sale Director, Vish continues to thrive on any challenge that comes his way as he manages an ever-growing portfolio. Vish thrives in the high paced world of real estate and is inspired by working alongside some of the best operators in the industry.",
    email: "vish@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/VishRealtor",
    instagram_url: "https://www.instagram.com/vish_safi/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/vish-safi-es110/sales/reviews",
    image_name: "vish.jpg",
  },
  {
    name: "Ridhima Jain",
    description:
      "“Each day is new and exciting, and I love the satisfaction that comes with helping people create wealth through property or purchase their dream home.” Ridhima Says. The privilege of looking after her client’s real estate dreams is a key motivator for Ridhima as she strives to achieve the best possible outcome on each and every occasion.  Confident, entrepreneurial and absolutely dedicated to everything she does.",
    email: "ridhima@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/ridhima.jain.5496",
    instagram_url: "https://www.instagram.com/ridhima.j/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/ridhima-jain-hu803/sales/overview",
    image_name: "ridhima.jpg",
  },
  {
    name: "Priydeep Solanki",
    description:
      "“Every property is different, every client is different – that makes each day an exciting new challenge,” he explains. A natural communicator with an impeccable work ethic and absolute dedication to his role, Priydeep is well-acquainted with working long hours and exceeding high expectations. He genuinely enjoys nothing more than seeing a happy buyer and vendor and will do everything in his power to secure the best outcome for everyone.",
    email: "priydeep@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/priydeep.solanki/",
    instagram_url: "https://www.instagram.com/realtywithpriydeep/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agency/okas-property-group-az038/sales/reviews",
    image_name: "priydeep.jpg",
  },
  {
    name: "Marie Barrow",
    description:
      "Marie’s philosophy is simple: treat everyone with respect, and be willing to do the extra little things which enhance a sales campaign, ensuring maximum exposure is obtained, resulting in a sale price that exceeds expectations. Marie is known for being honest, ethical and a big believer in transparent communication throughout the sales process. “I know what it’s like to work your way up from the bottom, and I’m glad that I have,” Marie says.",
    email: "marie@okaspropertygroup.com.au",
    facebook_url: "https://www.facebook.com/reeezyyy",
    instagram_url: "https://www.instagram.com/marie.theagent/",
    linkedIn_url: "https://www.linkedin.com/company/okas-property-group",
    rateMyAgent_url:
      "https://www.ratemyagent.com.au/real-estate-agent/marie-mahia-barrow-ie699/sales/reviews",
    image_name: "marie.jpg",
  },
  {
    name: "Saloni Singh",
    email: "saloni@okaspropertygroup.com.au",
    image_name: "saloni.jpg",
    facebook_url: "https://www.facebook.com/saloni.singh.39",
    instagram_url: "https://www.instagram.com/iamsaloni.singh/"
  },
  {
    name: "Kapil Kohli",
    email: "kapil@okaspropertygroup.com.au",
    image_name: "kapil.jpg"
  },
  {
    name: "Amol Pancholi",
    email: "amol@okaspropertygroup.com.au",
    description: `Amol has began his journey with OKAS Property Group. With fifteen years of experience in the customer service industry,He’s consistent and committed in his approach and it’s his personable character that sees him stand out, transact, and see bigger picture.“I’m passionate about providing clients with the highest level of service, and delivering a superior work ethic that helps people achieve their real estate goals.” Amol explains.`,
    image_name: "amol.jpg"
  },
  {
    name: "Trinh Le",
    email: "trinh@okaspropertygroup.com.au",
    description: `Trinh’s genuine approach to understanding customer requirements makes her a favourite with buyers and sellers alike.Trinh has a sixth sense when it comes to people and property. She is committed to building solid client relationships – based on trust rather than talking the talk – and her many satisfied clients are testament to that. Trinh’s expertise and experience and easy manner mean you too, can benefit as you make your important real estate choices.`,
    image_name: "trinh.jpg"
  },
  {
    name: "Navdeep Singh",
    email: "nav@okaspropertygroup.com.au",
    description: `Navdeep is extremely passionate about real estate and he endeavors to deliver the best experience possible for his clients.His high level of experience in sales and management with in-depth knowledge of customer service helps him in delivering positive results.Honesty, Integrity and being well organized are his strong assets. He ensures that the buying and selling process for the clients is as seamless as possible.`,
    image_name: "navdeep.jpg"
  },
  {
    name: "Ami Parmar",
    email: "ami@okaspropertygroup.com.au",
    // description:`Navdeep is extremely passionate about real estate and he endeavors to deliver the best experience possible for his clients.His high level of experience in sales and management with in-depth knowledge of customer service helps him in delivering positive results.Honesty, Integrity and being well organized are his strong assets. He ensures that the buying and selling process for the clients is as seamless as possible.`,
    image_name: "ami.jpg"
  },
  {
    name: "Meshwa Patel",
    email: "leasing@okaspropertygroup.com.au",
    // description:`Navdeep is extremely passionate about real estate and he endeavors to deliver the best experience possible for his clients.His high level of experience in sales and management with in-depth knowledge of customer service helps him in delivering positive results.Honesty, Integrity and being well organized are his strong assets. He ensures that the buying and selling process for the clients is as seamless as possible.`,
    image_name: "meshwa.jpg"
  },
  {
    name: "OKAS Truganina Leasing",
    email: "ire@okaspropertygroup.com.au",
    image_name: "leasing.jpg",
  },
  {
    name: "OKAS Leasing",
    email: "ire@okaspropertygroup.com.au; leasing@okaspropertygroup.com.au",
    image_name: "leasing.jpg",
  },
  {
    name: "Samir Shah",
    email: "samir@okaspropertygroup.com.au",
    image_name: "samir.jpg",
  },
  {
    name: "Priyanka Parmar",
    email: "priyanka@okaspropertygroup.com.au",
    image_name: "priyanka.jpg",
  },
  {
    name: "Ronit Chawla",
    email: "ronit@okaspropertygroup.com.au",
    image_name: "ronit.jpg",
  },
  {
    name: "Rashpal Puarr",
    email: "Rashpal@okaspropertygroup.com.au",
    image_name: "rashpal.jpeg",
  },
];
const agentDataWhichNotInVaultRe = [
  {
    photo: {
      original: `${process.env.SITE_URL}/uploads/jagruti.jpg`,
      thumb_360: `${process.env.SITE_URL}/uploads/jagruti.jpg`,
    },
    phoneNumbers: [
      // {
      //   number: "0425 426 956",
      //   typeCode: "M",
      //   type: "Mobile",
      //   comment: null,
      // },
    ],
    email: "adminokas@okaspropertygroup.com.au",
    username: "jagruti.lakhani",
    lastName: "Lakhani",
    id: 10000001,
    firstName: "Jagruti",
    position: "Admin Manager",
    agency: constants.truganina
  },
  // {
  //   photo: {
  //     original: `${process.env.SITE_URL}/uploads/sonal.jpg`,
  //     thumb_360: `${process.env.SITE_URL}/uploads/sonal.jpg`,
  //   },
  //   phoneNumbers: [
  //     {
  //       number: "0451 081 075",
  //       typeCode: "M",
  //       type: "Mobile",
  //       comment: null,
  //     },
  //   ],
  //   email: "rentals@okaspropertygroup.com.au",
  //   username: "sonal.joshi",
  //   lastName: "Joshi",
  //   id: 10000002,
  //   firstName: "Sonal",
  //   position: "Property Manager",
  //   agency: constants.truganina
  // }
]
module.exports = { hardikAsAgent, agentsStaticData, agentDataWhichNotInVaultRe };
