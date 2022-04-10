//סידס עסקים

const business = [
  {
    businessName: 'Avihay Meir',
    location: { name: 'אשקלון,שילה 15', lat: '31.6706', lng: '34.5578' },
    settings: {
      sendSMSClientSide: true,
      sendWhatsappClientSide: true,
      sendSMSAdminSide: false,
      sendWhatsappAdminSide: true,
      sendSMSClientSideCancel: true,
      sendWhatsappClientSideCancel: false,
      sendSMSAdminSideCancel: true,
      sendWhatsappAdminSideCancel: true,
      sendSMSClientSideReminder: false,
      sendWhatsappClientSideReminder: true,
      sendSMSAdminSideReminder: true,
      sendWhatsappAdminSideReminder: false,
      bookingooglecalender: false,
      notificationsTime: 60,
    },
    websiteColors: 'black+white',
    image: 'https://i.ibb.co/LZzRSrt/bgwhite.png',
    logo: 'https://i.ibb.co/Qjj3Qw7/IAM-BARBERSHOP-LOGO-WHITE2.png',
    logoNameOnNav: true,
    phone: '0508633008',
    businessOwner: null,
    workers: null,
    clients: [],
  },

  {
    businessName: 'Premium',
    location: { name: 'אשדוד הרמבם 8', lat: '31.8049', lng: '34.6535' },
    settings: {
      sendSMSClientSide: true,
      sendWhatsappClientSide: true,
      sendSMSAdminSide: false,
      sendWhatsappAdminSide: true,
      sendSMSClientSideCancel: true,
      sendWhatsappClientSideCancel: false,
      sendSMSAdminSideCancel: true,
      sendWhatsappAdminSideCancel: true,
      sendSMSClientSideReminder: false,
      sendWhatsappClientSideReminder: true,
      sendSMSAdminSideReminder: true,
      sendWhatsappAdminSideReminder: false,
      bookingooglecalender: false,

      notificationsTime: 30,
    },
    websiteColors: 'black+white',
    image: 'https://i.ibb.co/hKKPxf8/bgbg3.png',
    logo: 'https://i.ibb.co/85qLSWY/Premium-Logo-Blank2.png',
    logoNameOnNav: false,
    phone: '0509069090',
    businessOwner: null,
    workers: null,
    clients: [],
  },
]

export default business
