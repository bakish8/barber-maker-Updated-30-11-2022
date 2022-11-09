//סידס עסקים

const business = [
  {
    businessName: 'Avihay Meir',
    location: { name: 'אשקלון סיוון 8', lat: '31.6710', lng: '34.5807' },

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
    websiteColors: 'black+blue',
    image: 'https://www.barber-maker.com/static/media/mistaper2.48fa0c62.jpg',
    logo: 'https://i.ibb.co/p4cpnjV/AVIHAY-MEIR-HAITSTYLE-ARTIST.png',
    logoNameOnNav: false,
    phone: '0545200623',
    businessOwner: null,
    workers: null,
    clients: [],
  },
]

export default business
