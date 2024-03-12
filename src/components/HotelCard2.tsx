import React, { FC, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  CardContent,
  CardMedia,
  Card,
  CardActions,
  Pagination,
} from "@mui/material";
import {
  CurrencyLira,
  StarOutline,
  ForkRightRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Amenity = {
  id: number;
  name: string;
};
type Hotel = {
  id: number;
  city: string;
  rating: number;
  longitude: number;
  latitude: number;
  amenities: Amenity[];
  name: string;
  link: string;
};

const HotelCard: FC<Hotel> = ({
  id,
  name,
  city,
  rating,
  amenities,
  longitude,
  latitude,
  link,
}) => {
  const [page, setPage] = useState(1);

  const amenitiyGroups = [
    {
      groupName: "Dinlence ve Aktiviteler",
      amenities: [
        "Yoga dersleri",
        "Masaj (el masajı, tam vücut masajı, ayak masajı, baş masajı, boyun masajı)",
        "Tenis kortu",
        "Squash",
        "Golf sahası",
        "Bilardo",
        "Dart",
        "Masa tenisi",
        "Bowling",
        "Badminton",
        "Rüzgar sörfü",
        "Kano",
        "Şnorkelli dalış",
        "Dalış",
        "Ata binme",
        "Balık tutma",
        "Kayak",
        "Okçuluk",
        "Bisiklet turları",
        "Bisiklet mevcut",
        "Yürüyüş turları",
        "Doğa yürüyüşü",
        "Kayak kiralama",
        "Su sporları ekipmanı kiralama",
        "Video oyun konsolu",
        "Oyun salonu",
        "Çocuklar için oyun alanı",
        "Çocuk kulübü",
        "Animasyon ekibi",
        "Gece eğlencesi",
        "Karaoke",
        "Gece kulübü/DJ",
        "Casino ve talih oyunları",
      ],
    },
    {
      groupName: "Konfor ve Oda Özellikleri",
      amenities: [
        "Ücretsiz internet",
        "Ayrı oturma odası",
        "Ayrı yemek salonu",
        "Birbirine açılan odalar mevcut",
        "Kablolu/uydu bağlantılı TV",
        "Balayı süiti",
        "Süitler",
        "Aile odaları",
        "Sigara içilebilen odalar mevcut",
        "Ses geçirmez odalar",
        "Oturma alanı",
        "Düz ekran televizyon",
        "Klima",
        "Küçük mutfak",
        "Buzdolabı",
        "Mikrodalga fırın",
        "Bulaşık makinesi",
        "Mutfak eşyaları",
        "Elektrikli su ısıtıcısı",
        "Kahve/çay makinesi",
        "Minibar",
        "Ücretsiz banyo ve kişisel bakım malzemeleri",
        "Bornoz",
        "Saç kurutma makinesi",
        "Ortak mutfak",
      ],
    },
    {
      groupName: "Yiyecek ve İçecek",
      amenities: [
        "Barbekü alanları",
        "Çocuklara uygun büfe",
        "Restoran",
        "Bar/oturma salonu",
        "Çatı barı",
        "Odaya kahvaltı",
        "Ücretsiz kahvaltı",
        "Açık büfe kahvaltı",
        "Çocuk yemekleri",
        "Özel diyet menüleri",
        "Şarap/şampanya",
        "İndirimli içki saati",
        "Kahve dükkanı",
        "Atıştırmalık büfesi",
        "Açık hava yemek salonu",
      ],
    },
    {
      groupName: "Sağlık ve Spor",
      amenities: [
        "Spor salonlu/spor odalı fitness merkezi",
        "Havuz (açık havuz, kapalı havuz, ısıtmalı havuz, çocuk havuzu, manzaralı havuz, sığ kısmı bulunan havuz, tuzlu su havuzu, kaplıca havuzu, özel havuz, çatı havuzu)",
        "Sauna",
        "Buhar odası",
        "Spa",
        "Güneşlenme alanı",
        "Güneşlenme terası",
        "Solaryum",
        "Yoga odası",
        "Aerobik",
        "Fitness kursları",
      ],
    },
    {
      groupName: "Ulaşım ve Park Hizmetleri",
      amenities: [
        "Servis otobüsü hizmeti",
        "Yakınlarda halka açık ücretsiz otopark",
        "Cadde üzerinde park",
        "Tesis içi halka açık ücretli otopark",
        "Güvenli otopark",
        "Vale park hizmeti",
        "Tesis içinde ücretli özel otopark",
        "Yakınlarda ücretsiz özel otopark",
        "Yakınlarda ücretli halka açık otopark",
        "Yakınlarda ücretli özel otopark",
        "Araba kiralama",
        "Elektrikli araç şarj istasyonu",
        "Ücretsiz servis veya taksi hizmetleri",
        "Havaalanı ulaşım hizmeti",
        "Ücretsiz havaalanı ulaşım hizmeti",
        "Bisiklet kiralama",
      ],
    },
    {
      groupName: "Aile ve Çocuklar için Olanaklar",
      amenities: [
        "Çocuklar için kitaplar",
        "Çocuklar için kapalı oyun alanı",
        "Çocuk Aktiviteleri (Çocuğa/Aileye Uygun)",
        "Bebek sandalyesi mevcut",
        "Puset",
        "Çocuk havuzu",
        "Çocuklara uygun televizyon kanalları",
        "Bebek bakımı",
        "Çocuklara ücretsiz konaklama",
        "Çocuklar için açık hava oyun ekipmanı",
      ],
    },
    {
      groupName: "İş ve Toplantı Olanakları",
      amenities: [
        "Fotokopi/faks",
        "İş merkezinde ücretsiz kablosuz ağ",
        "İş merkezinde ücretsiz kablolu internet",
        "Toplantı odaları",
        "Konferans salonu",
        "İnternet bağlantılı iş amaçlı bölüm",
        "Dizüstü bilgisayar kasası",
      ],
    },
  ];

  const filteredAmenities = amenitiyGroups
    .map((item) => {
      return {
        groupName: item.groupName,
        amenities: item.amenities.filter((val) =>
          amenities.map(({ id, name }) => name).includes(val)
        ),
      };
    })
    .filter(({ groupName, amenities }) => amenities.length !== 0);

  const router = useRouter();
  console.log(name, longitude, latitude);
  return (
    <Card sx={{ marginBottom: 2, p: 2, maxWidth: 700 }}>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item xs={5}>
          <CardMedia
            component="img"
            sx={{ height: 140, borderRadius: "5%" }}
            image="/hotelcard.jpg"
          />
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            <Typography color="gray" variant="subtitle1">
              Entire Hotel in {city}
            </Typography>
            <Typography variant="h4">{name}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              {filteredAmenities.length !== 0 && (
                <Grid sx={{ height: 150 }} item xs={12}>
                  <Typography sx={{ paddingBottom: 1 }} variant="h5">
                    {filteredAmenities[page - 1].groupName}
                  </Typography>
                  <Grid container spacing={0.5}>
                    {filteredAmenities[page - 1].amenities.map(
                      (name, index) => (
                        <Grid item xs={4} key={index}>
                          <Typography variant="h6">{name}</Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              )}

              <Pagination
                page={page}
                onChange={(event, val) => setPage(val)}
                sx={{ paddingTop: 1 }}
                count={filteredAmenities.length}
              />
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Grid></Grid>
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" display="flex" alignItems="center">
                {rating === -1 ? "?" : rating.toFixed(1)}
                <StarOutline
                  fontSize="large"
                  style={{ color: "orange" }}
                  sx={{ marginLeft: 1 }}
                ></StarOutline>
              </Typography>

              <CardActions>
                <Button
                  onClick={() => {
                    window.open(`https://www.tripadvisor.com.tr/${link}`);
                  }}
                  startIcon={<CurrencyLira />}
                >
                  Checkout the Price
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/map?lng=${longitude}&lat=${latitude}`)
                  }
                  startIcon={<ForkRightRounded />}
                >
                  Get Directions
                </Button>
              </CardActions>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotelCard;
