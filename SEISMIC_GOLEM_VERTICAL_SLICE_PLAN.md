# Seismic Golem

## Vertical Slice Plan

Bu doküman, `Seismic Golem` için ilk gerçek oynanabilir dilimin kapsamını belirler.

Amaç:

- oyunun bütün final hayalini değil
- o hayalin gerçekten çalıştığını kanıtlayacak küçük ama kaliteli bir parçayı üretmek

Bu vertical slice bir "prototype"tan daha fazlası olmalı.
Yani:

- sadece mekanik testi değil
- oyunun hissini, tonunu ve kimliğini gerçekten taşımalı

## Vertical Slice Tanımı

Vertical slice şu soruya cevap vermeli:

`Seismic Golem kısa ama premium bir deneyim olarak gerçekten çalışıyor mu?`

Bu yüzden slice içinde şu 5 şey aynı anda hissedilmeli:

1. karakterin ağırlığı
2. sanctum atmosferi
3. çekirdeğin önemi
4. çevresel hikâye
5. Seismic temalı dünya kimliği

## Slice Süresi

Hedef süre:

- 8 ila 12 dakika

Bu süre içinde oyuncu:

- uyanır
- ilk rayı aktive eder
- ilk düşmanı döver
- küçük bir mühür sekansı çözer
- ilk büyük vista'yı görür

## Slice İçeriği

## 1. Uyanış Odası

İçerik:

- açılış kamera anı
- oyuncunun kontrolü alması
- çekirdeğin ilk ışığı
- sanctum'un ilk tepkisi

Amaç:

- tone setting

## 2. İlk Koridor

İçerik:

- yürüyüş hissi
- küçük ışıklı ray kırıntıları
- ilk altar node
- ilk kırılabilir bariyer

Amaç:

- oyuncuya çevreyle ilişki kurdurmak

## 3. İlk Combat Cebi

İçerik:

- 1 küçük guardian fragment
- 1 biraz daha dayanıklı enemy
- ilk shard ödülü

Amaç:

- yumruk ve core hissini göstermek

## 4. Mühür Bahçesi Kısa Versiyon

İçerik:

- iki küçük düğüm
- açılan kapı
- bir kısa yazıt

Amaç:

- puzzle + worldbuilding ilişkisini göstermek

## 5. Vista Alanı

İçerik:

- kamera açılır
- oyuncu sanctum'un daha büyük parçasını görür
- bölüm burada biter veya kapı burada kapanır

Amaç:

- "devamını görmek isterim" duygusu

## Vertical Slice'ta Olmayacaklar

Şimdilik slice dışında kalmalı:

- tam oyun uzunluğu
- bütün sanctum node'ları
- final ritüeli
- tam düşman çeşitliliği
- tam UI polish
- lore'un bütün katmanları

Kural:

Vertical slice, her şeyi yapmaya çalışmaz.
Doğru şeyi çok iyi yapar.

## Üretim Aşamaları

## Aşama 1: Greybox

Hedef:

- mekan akışı çalışsın
- kamera rotaları test edilsin
- traversal temposu otursun

Görevler:

- uyanış odası blockout
- ilk koridor blockout
- mühür bahçesi blockout
- vista alanı blockout
- level pacing testi

Çıkış kriteri:

- 8-12 dakikalık boş ama akıcı bir yol oluşmuş olmalı

## Aşama 2: Core Interaction Pass

Hedef:

- oyuncu hareketi, yumruk, core pulse ve altar aktivasyonu bağlansın

Görevler:

- ağır yürüyüş sistemi
- yumruk zamanlaması
- küçük kırılabilir taş bariyer
- altar node aktivasyonu
- kapı açılma sekansı

Çıkış kriteri:

- level baştan sona oynanabiliyor olmalı

## Aşama 3: Atmosphere Pass

Hedef:

- oyunun kimliği görünmeye başlasın

Görevler:

- ışık yerleşimi
- pembe core vurgu noktaları
- temel fog / haze
- taş yüzey materyal dili
- arka plan boşluk kompozisyonu

Çıkış kriteri:

- sahne artık test map gibi değil, oyun alanı gibi görünmeli

## Aşama 4: Narrative Pass

Hedef:

- hikâye sessizce hissedilsin

Görevler:

- 4-5 yazıt yerleştirme
- ilk sanctum node ismi
- altar çevresi yazısı
- çekirdeğe tepki veren ray çizgileri

Çıkış kriteri:

- oyuncu açıklama olmadan dünyada anlam hissetmeli

## Aşama 5: Audio/Feel Pass

Hedef:

- slice premium his versin

Görevler:

- adım sesleri
- yumruk impact
- core hum
- ambience katmanları
- vista müzik yükselişi
- mikro kamera shake

Çıkış kriteri:

- oyun videosu izlenince bile hissiyat anlaşılmalı

## İş Paketi Listesi

## Design

- opening beat sheet
- slice layout sketch
- inscription placement pass
- interaction timing notes

## Environment

- sanctum architecture kit
- floor / wall / altar materials
- broken barrier prop
- ray line decal system
- pillar set

## Character

- final golem model reference lock
- idle / walk / punch timing
- core glow states
- ritual pose

## Gameplay

- movement controller
- melee hit logic
- core pulse trigger
- breakable objects
- node activation logic
- checkpoint logic

## Audio

- footsteps
- impact set
- crystal pulse layer
- sanctum ambience loop
- vista cue

## UI

- minimal chapter title
- minimal interaction prompt
- no heavy HUD clutter

## Slice Başarı Kriterleri

Vertical slice başarılı sayılmalıysa:

- ilk 30 saniye karakterli olmalı
- oyuncu 3. dakikada "bu farklı bir şey" demeli
- ilk combat ucuz hissettirmemeli
- vista alanı akılda kalmalı
- oyun küçük olsa bile premium niyet okunmalı

## Kırmızı Bayraklar

Şunlar olursa slice başarısız sayılır:

- test map gibi görünüyorsa
- karakter çevreyle alakasız duruyorsa
- çekirdek sıradan VFX gibi görünüyorsa
- sanctum teması generic fantasy'e kayıyorsa
- her şey aynı ritimde gidiyorsa

## Son Çıktı

Vertical slice sonunda elimizde şunlar olmalı:

- 8-12 dakikalık oynanabilir build
- kısa capture alınabilir kalite
- pitch için gösterilebilir ilk video
- tam oyuna ölçeklenebilir sağlam ton

