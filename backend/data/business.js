//סידס עסקים

const business = [
  {
    businessName: 'Avihay Meir',
    location: {
      name: 'אשקלון סיוון 8',
      lat: '31.670894125490936',
      lng: '34.58053549072671',
    },

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
    logo: 'https://i.ibb.co/pP1vFcX/AVIHAY-MEIR-HAITSTYLE-ARTIST-V2.png',
    logoNameOnNav: false,
    phone: '0545200623',
    businessOwner: null,
    workers: null,
    clients: [],
  },
]

export default business
