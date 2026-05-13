import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const categories = [
  {
    name: 'Работа',
    icon: '💼',
    color: 'from-blue-500 to-indigo-500',
    scenarios: [
      {
        title: 'Опоздаю на смену',
        korean: '오늘 교통 때문에 10분 정도 늦을 것 같습니다. 죄송합니다.',
        soft: '죄송하지만 오늘 교통 상황 때문에 10분 정도 늦을 것 같습니다. 양해 부탁드립니다.',
        direct: '오늘 10분 늦습니다. 도착하면 바로 연락드리겠습니다.',
        russian: 'Сегодня из-за транспорта я, кажется, опоздаю примерно на 10 минут. Извините.',
        romanization: 'Oneul gyotong ttaemune sip-bun jeongdo neujeul geot gatseumnida. Joesonghamnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Попросить выходной',
        korean: '개인 사정이 있어서 이번 금요일에 하루 쉴 수 있을까요?',
        soft: '혹시 가능하시다면 개인 사정으로 이번 금요일에 하루 쉬어도 괜찮을까요?',
        direct: '개인 사정으로 이번 금요일에 쉬고 싶습니다.',
        russian: 'У меня личные обстоятельства. Можно ли отдохнуть один день в эту пятницу?',
        romanization: 'Gaein sajeongi isseoseo ibeon geumyoire haru swil su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Уточнить расписание',
        korean: '내일 근무 시간이 몇 시부터 몇 시까지인지 확인 부탁드립니다.',
        soft: '바쁘시겠지만 내일 근무 시간이 몇 시부터 몇 시까지인지 확인해 주실 수 있을까요?',
        direct: '내일 근무 시간을 알려 주세요.',
        russian: 'Пожалуйста, уточните, со скольких до скольких у меня завтра рабочее время.',
        romanization: 'Naeil geunmu sigani myeot sibuteo myeot sikkaji-inji hwagin butakdeurimnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Сообщить о болезни',
        korean: '몸이 좋지 않아서 오늘 출근이 어려울 것 같습니다. 죄송합니다.',
        soft: '죄송하지만 몸 상태가 좋지 않아 오늘 출근이 어려울 것 같습니다. 양해 부탁드립니다.',
        direct: '몸이 아파서 오늘 출근하기 어렵습니다.',
        russian: 'Мне нехорошо, поэтому сегодня, кажется, будет сложно выйти на работу. Извините.',
        romanization: 'Momi jotji anaseo oneul chulgeuni eoryeoul geot gatseumnida. Joesonghamnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Поблагодарить коллегу',
        korean: '오늘 도와주셔서 정말 감사합니다. 덕분에 많이 배웠습니다.',
        soft: '오늘 바쁘신데도 도와주셔서 정말 감사합니다. 덕분에 큰 도움이 되었습니다.',
        direct: '오늘 도와주셔서 감사합니다. 도움이 됐습니다.',
        russian: 'Большое спасибо, что помогли мне сегодня. Благодаря вам я многому научился/научилась.',
        romanization: 'Oneul dowajusyeoseo jeongmal gamsahamnida. Deokbune mani baewotseumnida.',
        politeness: 'Тёплый вежливый',
      },
    ],
  },
  {
    name: 'Зарплата',
    icon: '💸',
    color: 'from-emerald-500 to-teal-500',
    scenarios: [
      {
        title: 'Уточнить дату выплаты',
        korean: '이번 달 월급은 언제 입금되는지 알 수 있을까요?',
        soft: '죄송하지만 이번 달 월급 입금 예정일을 확인해 주실 수 있을까요?',
        direct: '이번 달 월급 입금일을 알려 주세요.',
        russian: 'Можно узнать, когда будет переведена зарплата за этот месяц?',
        romanization: 'Ibeon dal wolgeubeun eonje ipgeumdoeneunji al su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Попросить расчёт',
        korean: '이번 달 급여 명세서를 받을 수 있을까요?',
        soft: '혹시 가능하시다면 이번 달 급여 명세서를 보내 주실 수 있을까요?',
        direct: '이번 달 급여 명세서를 보내 주세요.',
        russian: 'Можно получить расчётный лист за этот месяц?',
        romanization: 'Ibeon dal geubyeo myeongseseoreul badeul su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Сообщить о недоплате',
        korean: '확인해 보니 이번 달 급여가 예상보다 적게 입금된 것 같습니다.',
        soft: '죄송하지만 확인해 보니 이번 달 급여가 예상보다 적게 입금된 것 같아 확인 부탁드립니다.',
        direct: '이번 달 급여가 적게 입금된 것 같습니다. 확인해 주세요.',
        russian: 'Я проверил/проверила: кажется, зарплата за этот месяц пришла меньше ожидаемой.',
        romanization: 'Hwagin-hae boni ibeon dal geubyeoga yesangboda jeokge ipgeumdoen geot gatseumnida.',
        politeness: 'Осторожно-официальный',
      },
      {
        title: 'Уточнить сверхурочные',
        korean: '지난주 추가 근무 수당이 급여에 포함되었는지 확인 부탁드립니다.',
        soft: '바쁘시겠지만 지난주 추가 근무 수당이 급여에 포함되었는지 확인해 주실 수 있을까요?',
        direct: '지난주 추가 근무 수당이 포함됐는지 확인해 주세요.',
        russian: 'Пожалуйста, проверьте, включена ли оплата за переработку на прошлой неделе в зарплату.',
        romanization: 'Jinanju chuga geunmu sudangi geubyeoe pohamdoeeonneunji hwagin butakdeurimnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Уточнить банковский счёт',
        korean: '급여 입금 계좌를 변경하고 싶습니다. 필요한 서류가 있을까요?',
        soft: '죄송하지만 급여 입금 계좌를 변경하고 싶은데 필요한 서류가 있는지 안내 부탁드립니다.',
        direct: '급여 계좌를 변경하고 싶습니다. 필요한 서류를 알려 주세요.',
        russian: 'Я хочу поменять счёт для получения зарплаты. Есть ли нужные документы?',
        romanization: 'Geubyeo ipgeum gyejwareul byeongyeonghago sipseumnida. Piryohan seoryuga isseulkkayo?',
        politeness: 'Вежливо-официальный',
      },
    ],
  },
  {
    name: 'Продавец',
    icon: '🛍️',
    color: 'from-fuchsia-500 to-pink-500',
    scenarios: [
      {
        title: 'Спросить цену',
        korean: '이거 가격이 얼마인가요?',
        soft: '죄송하지만 이거 가격이 얼마인지 알 수 있을까요?',
        direct: '이거 얼마예요?',
        russian: 'Сколько это стоит?',
        romanization: 'Igeo gagyeogi eolmaingayo?',
        politeness: 'Нейтрально-вежливый',
      },
      {
        title: 'Попросить размер',
        korean: '이 제품 M 사이즈가 있나요?',
        soft: '혹시 이 제품 M 사이즈가 있는지 확인해 주실 수 있을까요?',
        direct: '이 제품 M 사이즈 있어요?',
        russian: 'Есть ли этот товар в размере M?',
        romanization: 'I jepum em saijeuga innayo?',
        politeness: 'Нейтрально-вежливый',
      },
      {
        title: 'Попросить пакет',
        korean: '봉투 하나 주실 수 있을까요?',
        soft: '가능하시다면 봉투 하나 부탁드려도 될까요?',
        direct: '봉투 하나 주세요.',
        russian: 'Можно один пакет?',
        romanization: 'Bongtu hana jusil su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Спросить про возврат',
        korean: '혹시 교환이나 환불이 가능한가요?',
        soft: '죄송하지만 구매 후 교환이나 환불이 가능한지 안내해 주실 수 있을까요?',
        direct: '교환이나 환불 가능해요?',
        russian: 'Возможен ли обмен или возврат?',
        romanization: 'Hoksi gyohwanina hwanburi ganeunghangayo?',
        politeness: 'Нейтрально-вежливый',
      },
      {
        title: 'Спросить про скидку',
        korean: '혹시 할인되는 상품인가요?',
        soft: '죄송하지만 이 상품에 적용되는 할인이 있는지 알 수 있을까요?',
        direct: '이거 할인돼요?',
        russian: 'Есть ли скидка на этот товар?',
        romanization: 'Hoksi harindoeneun sangpumingayo?',
        politeness: 'Осторожно-вежливый',
      },
    ],
  },
  {
    name: 'Доставка',
    icon: '📦',
    color: 'from-orange-500 to-amber-500',
    scenarios: [
      {
        title: 'Уточнить адрес',
        korean: '배송 주소를 다시 확인해 주실 수 있을까요?',
        soft: '번거로우시겠지만 배송 주소를 한 번만 다시 확인해 주실 수 있을까요?',
        direct: '배송 주소를 다시 확인해 주세요.',
        russian: 'Можете ещё раз проверить адрес доставки?',
        romanization: 'Baesong jusoreul dasi hwagin-hae jusil su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Попросить оставить у двери',
        korean: '부재중이면 문 앞에 놓아 주세요.',
        soft: '제가 부재중일 경우 문 앞에 놓아 주시면 감사하겠습니다.',
        direct: '없으면 문 앞에 놓아 주세요.',
        russian: 'Если меня нет, пожалуйста, оставьте у двери.',
        romanization: 'Bujaejung-imyeon mun ape no-a juseyo.',
        politeness: 'Нейтрально-вежливый',
      },
      {
        title: 'Сообщить о задержке',
        korean: '배송이 아직 도착하지 않았습니다. 확인 부탁드립니다.',
        soft: '죄송하지만 배송이 아직 도착하지 않아 현재 위치 확인을 부탁드립니다.',
        direct: '배송이 아직 안 왔습니다. 확인해 주세요.',
        russian: 'Доставка ещё не прибыла. Пожалуйста, проверьте.',
        romanization: 'Baesongi ajik dochakaji anatseumnida. Hwagin butakdeurimnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Поменять время доставки',
        korean: '배송 시간을 오늘 저녁으로 변경할 수 있을까요?',
        soft: '혹시 가능하시다면 배송 시간을 오늘 저녁으로 변경해 주실 수 있을까요?',
        direct: '배송 시간을 오늘 저녁으로 바꿔 주세요.',
        russian: 'Можно изменить время доставки на сегодняшний вечер?',
        romanization: 'Baesong siganeul oneul jeonyeogeuro byeongyeonghal su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Неверный товар',
        korean: '주문한 상품과 다른 상품이 도착했습니다. 교환 가능할까요?',
        soft: '죄송하지만 주문한 상품과 다른 상품이 도착해서 교환이 가능한지 문의드립니다.',
        direct: '다른 상품이 왔습니다. 교환해 주세요.',
        russian: 'Пришёл товар, отличающийся от заказанного. Возможен обмен?',
        romanization: 'Jumunhan sangpumgwa dareun sangpumi dochakhaetseumnida. Gyohwan ganeunghalkkayo?',
        politeness: 'Осторожно-официальный',
      },
    ],
  },
  {
    name: 'Жильё',
    icon: '🏠',
    color: 'from-cyan-500 to-sky-500',
    scenarios: [
      {
        title: 'Сообщить о поломке',
        korean: '방 안에 전등이 고장 난 것 같습니다. 확인 부탁드립니다.',
        soft: '죄송하지만 방 안 전등이 고장 난 것 같아 확인해 주실 수 있을까요?',
        direct: '방 전등이 고장 났습니다. 확인해 주세요.',
        russian: 'Кажется, в комнате сломалась лампа. Пожалуйста, проверьте.',
        romanization: 'Bang ane jeondeungi gojang nan geot gatseumnida. Hwagin butakdeurimnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Спросить про оплату коммуналки',
        korean: '이번 달 관리비는 언제까지 납부하면 될까요?',
        soft: '죄송하지만 이번 달 관리비 납부 기한을 알려 주실 수 있을까요?',
        direct: '이번 달 관리비 납부 기한을 알려 주세요.',
        russian: 'До какого числа нужно оплатить коммунальные/эксплуатационные расходы за этот месяц?',
        romanization: 'Ibeon dal gwallibineun eonjekkaji napbuhamyeon doelkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Попросить ремонт',
        korean: '싱크대에서 물이 새고 있습니다. 수리 가능할까요?',
        soft: '죄송하지만 싱크대에서 물이 새고 있어 수리 일정을 잡을 수 있을까요?',
        direct: '싱크대에서 물이 샙니다. 수리해 주세요.',
        russian: 'Из раковины течёт вода. Возможен ремонт?',
        romanization: 'Singkeudaeeseo muri saego itseumnida. Suri ganeunghalkkayo?',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Уточнить договор',
        korean: '계약 기간과 보증금 반환 조건을 다시 확인하고 싶습니다.',
        soft: '번거로우시겠지만 계약 기간과 보증금 반환 조건을 다시 안내해 주실 수 있을까요?',
        direct: '계약 기간과 보증금 반환 조건을 다시 알려 주세요.',
        russian: 'Я хочу ещё раз уточнить срок договора и условия возврата депозита.',
        romanization: 'Gyeyak gigangwa bojeunggeum banhwan jogeoneul dasi hwagin-hago sipseumnida.',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Шум от соседей',
        korean: '밤에 소음이 심해서 잠을 자기 어렵습니다. 확인 부탁드립니다.',
        soft: '죄송하지만 밤 시간 소음이 심해 생활이 어려워 확인을 부탁드려도 될까요?',
        direct: '밤에 소음이 심합니다. 확인해 주세요.',
        russian: 'Ночью сильный шум, из-за этого трудно спать. Пожалуйста, проверьте.',
        romanization: 'Bame soeumi simhaeseo jameul jagi eoryeopseumnida. Hwagin butakdeurimnida.',
        politeness: 'Осторожно-официальный',
      },
    ],
  },
  {
    name: 'Больница',
    icon: '🏥',
    color: 'from-rose-500 to-red-500',
    scenarios: [
      {
        title: 'Записаться на приём',
        korean: '진료 예약을 하고 싶습니다. 가능한 시간이 있을까요?',
        soft: '죄송하지만 진료 예약을 하고 싶은데 가능한 시간을 안내해 주실 수 있을까요?',
        direct: '진료 예약하고 싶습니다. 가능한 시간을 알려 주세요.',
        russian: 'Я хочу записаться на приём. Есть ли доступное время?',
        romanization: 'Jillyo yeyageul hago sipseumnida. Ganeunghan sigani isseulkkayo?',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Описать симптомы',
        korean: '어제부터 열이 나고 목이 아픕니다.',
        soft: '어제부터 열이 나고 목이 아파서 진료를 받고 싶습니다.',
        direct: '열이 나고 목이 아픕니다.',
        russian: 'Со вчерашнего дня температура и болит горло.',
        romanization: 'Eojebuteo yeori nago mogi apeumnida.',
        politeness: 'Нейтрально-вежливый',
      },
      {
        title: 'Спросить про страховку',
        korean: '외국인 건강보험으로 진료가 가능한가요?',
        soft: '죄송하지만 외국인 건강보험으로 진료가 가능한지 확인해 주실 수 있을까요?',
        direct: '외국인 건강보험 사용 가능해요?',
        russian: 'Можно ли получить лечение по медицинской страховке для иностранцев?',
        romanization: 'Oegugin geongangboheomeuro jillyoga ganeunghangayo?',
        politeness: 'Вежливо-официальный',
      },
      {
        title: 'Попросить справку',
        korean: '회사에 제출할 진단서를 받을 수 있을까요?',
        soft: '죄송하지만 회사 제출용 진단서를 발급받을 수 있을까요?',
        direct: '회사 제출용 진단서를 주세요.',
        russian: 'Можно получить медицинскую справку для предоставления на работу?',
        romanization: 'Hoesae jechulhal jindanseoreul badeul su isseulkkayo?',
        politeness: 'Вежливая просьба',
      },
      {
        title: 'Попросить медленнее говорить',
        korean: '죄송하지만 한국어가 서툴러서 천천히 말씀해 주실 수 있을까요?',
        soft: '죄송하지만 제가 한국어가 아직 서툴러서 조금만 천천히 설명해 주시면 감사하겠습니다.',
        direct: '한국어가 서툽니다. 천천히 말해 주세요.',
        russian: 'Извините, мой корейский слабый. Можете говорить медленнее?',
        romanization: 'Joesonghajiman hangugeoga seotulleoseo cheoncheonhi malsseumhae jusil su isseulkkayo?',
        politeness: 'Очень вежливый',
      },
    ],
  },
];

const historyKey = 'korean-message-history';

const customSituations = [
  { value: 'work', label: 'работа' },
  { value: 'salary', label: 'зарплата' },
  { value: 'seller', label: 'продавец' },
  { value: 'delivery', label: 'доставка' },
  { value: 'housing', label: 'жильё' },
  { value: 'hospital', label: 'больница' },
  { value: 'chat', label: 'обычный чат' },
];

const customStyles = [
  { value: 'soft', label: 'мягко' },
  { value: 'normal', label: 'нормально' },
  { value: 'direct', label: 'прямо' },
  { value: 'veryPolite', label: 'очень вежливо' },
];

const styleLabels = Object.fromEntries(customStyles.map((style) => [style.value, style.label]));
const situationLabels = Object.fromEntries(customSituations.map((situation) => [situation.value, situation.label]));

const demoResponses = {
  salary: {
    topic: 'зарплата',
    russian: 'Пожалуйста, проверьте вопрос по зарплате и сообщите мне, когда будет удобно.',
    romanization: 'Geubyeo gwallyeon naeyongeul hwaginhasigo pyeonhasil ttae allyeo jusimyeon gamsahagesseumnida.',
    explanation: 'Для зарплаты лучше звучит спокойная официальная форма: она показывает уважение и не выглядит как обвинение.',
    byStyle: {
      soft: '죄송하지만 급여 관련 내용을 확인해 주시고 편하실 때 알려 주시면 감사하겠습니다.',
      normal: '급여 관련 내용을 확인해 주실 수 있을까요?',
      direct: '급여 관련 내용을 확인해 주세요.',
      veryPolite: '바쁘신 와중에 죄송하지만 급여 관련 내용을 확인해 주시면 대단히 감사하겠습니다.',
    },
  },
  meeting: {
    topic: 'встреча',
    russian: 'Можно уточнить или назначить время встречи?',
    romanization: 'Miting siganeul hwagin-hageona jeonghal su isseulkkayo?',
    explanation: 'Для встречи подходит вопросительная вежливая форма: она оставляет собеседнику возможность выбрать удобное время.',
    byStyle: {
      soft: '혹시 가능하시다면 미팅 시간을 확인하거나 정할 수 있을까요?',
      normal: '미팅 시간을 확인하거나 정할 수 있을까요?',
      direct: '미팅 시간을 정해 주세요.',
      veryPolite: '번거로우시겠지만 가능한 미팅 시간을 안내해 주시면 감사하겠습니다.',
    },
  },
  delivery: {
    topic: 'доставка',
    russian: 'Пожалуйста, проверьте доставку и сообщите мне статус.',
    romanization: 'Baesong sanghwang-eul hwaginhasigo allyeo juseyo.',
    explanation: 'В вопросах доставки уместна короткая просьба с “확인해 주세요”: она понятная для продавца или курьера.',
    byStyle: {
      soft: '죄송하지만 배송 상황을 확인해 주시고 알려 주실 수 있을까요?',
      normal: '배송 상황을 확인해 주실 수 있을까요?',
      direct: '배송 상황을 확인해 주세요.',
      veryPolite: '번거로우시겠지만 배송 상황을 확인해 주시고 안내해 주시면 감사하겠습니다.',
    },
  },
};

const detectDemoTopic = (message) => {
  const text = message.toLowerCase();

  if (/(зарплат|аванс|деньг|оплат|расч[её]т|недоплат|преми)/i.test(text)) {
    return 'salary';
  }

  if (/(встреч|встрет|созвон|собран|митинг|переговор|перенести)/i.test(text)) {
    return 'meeting';
  }

  if (/(достав|курьер|посыл|заказ|товар|адрес|трек)/i.test(text)) {
    return 'delivery';
  }

  return 'fallback';
};

const makeFallbackResponse = (message, style) => {
  const meaning = message.trim() || 'У меня есть вопрос, пожалуйста, проверьте его.';
  const byStyle = {
    soft: `죄송하지만 제가 말씀드리고 싶은 내용은 다음과 같습니다: «${meaning}». 확인해 주실 수 있을까요?`,
    normal: `제가 말씀드리고 싶은 내용은 다음과 같습니다: «${meaning}». 확인 부탁드립니다.`,
    direct: `다음 내용을 확인해 주세요: «${meaning}».`,
    veryPolite: `바쁘신 와중에 죄송하지만 다음 내용을 확인해 주시면 대단히 감사하겠습니다: «${meaning}».`,
  };

  return {
    topic: 'универсальная тема',
    korean: byStyle[style],
    russian: meaning,
    romanization: 'Jega malsseumdeurigo sipeun naeyongeun daeumgwa gatseumnida. Hwagin butakdeurimnida.',
    explanation: 'Тема не распознана, поэтому используется универсальная безопасная формула с просьбой проверить сообщение.',
  };
};

const generateCustomMessage = ({ message, situation, style }) => {
  const topic = detectDemoTopic(message);

  if (topic === 'fallback') {
    return {
      ...makeFallbackResponse(message, style),
      situation: situationLabels[situation],
      style: styleLabels[style],
    };
  }

  const response = demoResponses[topic];

  return {
    topic: response.topic,
    situation: situationLabels[situation],
    style: styleLabels[style],
    korean: response.byStyle[style],
    russian: response.russian,
    romanization: response.romanization,
    explanation: response.explanation,
  };
};

function App() {
  const [activeMode, setActiveMode] = useState('templates');
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [toneByScenario, setToneByScenario] = useState({});
  const [copiedId, setCopiedId] = useState('');
  const [history, setHistory] = useState([]);
  const [customText, setCustomText] = useState('');
  const [customSituation, setCustomSituation] = useState('work');
  const [customStyle, setCustomStyle] = useState('normal');
  const [customResult, setCustomResult] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
    setHistory(savedHistory);
  }, []);

  const currentCategory = useMemo(
    () => categories.find((category) => category.name === activeCategory),
    [activeCategory],
  );

  const getScenarioId = (categoryName, title) => `${categoryName}-${title}`;

  const getMessage = (scenario, scenarioId) => {
    const tone = toneByScenario[scenarioId] || 'korean';
    return scenario[tone];
  };

  const updateTone = (scenarioId, tone) => {
    setToneByScenario((current) => ({ ...current, [scenarioId]: tone }));
  };

  const saveToHistory = (item) => {
    const newHistoryItem = {
      id: `${Date.now()}-${item.title}`,
      copiedAt: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      ...item,
    };

    const nextHistory = [newHistoryItem, ...history].slice(0, 8);
    setHistory(nextHistory);
    localStorage.setItem(historyKey, JSON.stringify(nextHistory));
  };

  const copyText = async ({ text, category, title, copiedKey }) => {
    await navigator.clipboard.writeText(text);
    saveToHistory({ category, title, text });
    setCopiedId(copiedKey);
    window.setTimeout(() => setCopiedId(''), 1600);
  };

  const copyMessage = async (scenario, scenarioId) => {
    const text = getMessage(scenario, scenarioId);
    await copyText({
      text,
      category: activeCategory,
      title: scenario.title,
      copiedKey: scenarioId,
    });
  };

  const handleGenerateCustom = () => {
    setCustomResult(generateCustomMessage({
      message: customText,
      situation: customSituation,
      style: customStyle,
    }));
  };

  const copyCustomResult = async () => {
    if (!customResult) {
      return;
    }

    await copyText({
      text: customResult.korean,
      category: 'Своё сообщение',
      title: `${customResult.situation} · ${customResult.style}`,
      copiedKey: 'custom-result',
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(historyKey);
  };

  const renderHistory = () => (
    <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-white/10 p-4 text-white shadow-soft backdrop-blur lg:sticky lg:top-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">localStorage</p>
          <h2 className="text-xl font-black">История копирования</h2>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20">
            Очистить
          </button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {history.length === 0 ? (
          <p className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-200">
            Здесь появятся последние 8 сообщений, которые вы скопировали.
          </p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-3 text-slate-900">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500">
                <span>{item.category} · {item.title}</span>
                <span>{item.copiedAt}</span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </aside>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col bg-[radial-gradient(circle_at_top_left,#4f46e5_0,#111827_36%,#020617_75%)] px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/10 p-5 text-white shadow-soft backdrop-blur">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            Korean Message Generator
          </p>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">
            Корейские сообщения без стресса
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
            Выберите готовый сценарий или напишите свою мысль по-русски — демо-генератор подберёт корейскую вежливую форму без подключения AI API.
          </p>
        </header>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-[1.5rem] border border-white/10 bg-white/10 p-2 text-white shadow-soft backdrop-blur">
          <button
            onClick={() => setActiveMode('templates')}
            className={`rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[0.98] ${activeMode === 'templates' ? 'bg-white text-slate-950' : 'text-white hover:bg-white/10'}`}
          >
            Готовые шаблоны
          </button>
          <button
            onClick={() => setActiveMode('custom')}
            className={`rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[0.98] ${activeMode === 'custom' ? 'bg-white text-slate-950' : 'text-white hover:bg-white/10'}`}
          >
            Своё сообщение
          </button>
        </div>

        {activeMode === 'templates' ? (
          <>
            <nav className="-mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0" aria-label="Категории">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`shrink-0 rounded-2xl border px-4 py-3 text-left shadow-lg transition active:scale-95 ${
                    activeCategory === category.name
                      ? 'border-white bg-white text-slate-950'
                      : 'border-white/10 bg-white/10 text-white backdrop-blur hover:bg-white/15'
                  }`}
                >
                  <span className="mr-2 text-xl" aria-hidden="true">{category.icon}</span>
                  <span className="font-bold">{category.name}</span>
                </button>
              ))}
            </nav>

            <div className="grid flex-1 gap-4 lg:grid-cols-[1fr_20rem]">
              <section className="space-y-4">
                <div className={`rounded-[1.75rem] bg-gradient-to-r ${currentCategory.color} p-5 text-white shadow-soft`}>
                  <p className="text-sm font-semibold text-white/80">Категория</p>
                  <h2 className="mt-1 text-2xl font-black">{currentCategory.icon} {currentCategory.name}</h2>
                  <p className="mt-2 text-sm text-white/85">5 готовых сценариев с переводом, романизацией и уровнем вежливости.</p>
                </div>

                {currentCategory.scenarios.map((scenario) => {
                  const scenarioId = getScenarioId(currentCategory.name, scenario.title);
                  const activeTone = toneByScenario[scenarioId] || 'korean';
                  const message = getMessage(scenario, scenarioId);

                  return (
                    <article key={scenarioId} className="rounded-[1.75rem] border border-white/10 bg-white p-4 shadow-soft sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Сценарий</p>
                          <h3 className="mt-1 text-xl font-black text-slate-950">{scenario.title}</h3>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{scenario.politeness}</span>
                      </div>

                      <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Корейский текст</span>
                          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/75">
                            {activeTone === 'soft' ? 'мягче' : activeTone === 'direct' ? 'прямее' : 'базовый'}
                          </span>
                        </div>
                        <p className="text-lg font-bold leading-8 tracking-[-0.01em]">{message}</p>
                      </div>

                      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <dt className="font-bold text-slate-500">Русское значение</dt>
                          <dd className="mt-1 leading-6 text-slate-800">{scenario.russian}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <dt className="font-bold text-slate-500">Романизация</dt>
                          <dd className="mt-1 leading-6 text-slate-800">{scenario.romanization}</dd>
                        </div>
                      </dl>

                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <button
                          onClick={() => copyMessage(scenario, scenarioId)}
                          className="rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                        >
                          {copiedId === scenarioId ? 'Скопировано ✓' : 'Копировать корейский'}
                        </button>
                        <button
                          onClick={() => updateTone(scenarioId, 'soft')}
                          className="rounded-2xl bg-cyan-50 px-4 py-3 font-bold text-cyan-800 transition hover:bg-cyan-100 active:scale-[0.98]"
                        >
                          Сделать мягче
                        </button>
                        <button
                          onClick={() => updateTone(scenarioId, 'direct')}
                          className="rounded-2xl bg-amber-50 px-4 py-3 font-bold text-amber-800 transition hover:bg-amber-100 active:scale-[0.98]"
                        >
                          Сделать прямее
                        </button>
                      </div>
                    </article>
                  );
                })}
              </section>

              {renderHistory()}
            </div>
          </>
        ) : (
          <div className="mt-5 grid flex-1 gap-4 lg:grid-cols-[1fr_20rem]">
            <section className="space-y-4">
              <article className="rounded-[1.75rem] border border-white/10 bg-white p-4 shadow-soft sm:p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Демо-режим без AI API</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">Своё сообщение</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Напишите мысль по-русски. Сейчас логика распознаёт зарплату, встречу и доставку, а для остальных тем делает универсальную вежливую фразу.
                  </p>
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-black text-slate-700">Ваше сообщение по-русски</span>
                  <textarea
                    value={customText}
                    onChange={(event) => setCustomText(event.target.value)}
                    rows="7"
                    placeholder="Например: Можно уточнить, когда придёт зарплата за этот месяц?"
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </label>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-black text-slate-700">Ситуация</span>
                    <select
                      value={customSituation}
                      onChange={(event) => setCustomSituation(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    >
                      {customSituations.map((situation) => (
                        <option key={situation.value} value={situation.value}>{situation.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-black text-slate-700">Стиль</span>
                    <select
                      value={customStyle}
                      onChange={(event) => setCustomStyle(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    >
                      {customStyles.map((style) => (
                        <option key={style.value} value={style.value}>{style.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <button
                  onClick={handleGenerateCustom}
                  className="mt-5 w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-black text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  Сформировать
                </button>
              </article>

              {customResult && (
                <article className="rounded-[1.75rem] border border-white/10 bg-white p-4 shadow-soft sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Результат</p>
                      <h3 className="mt-1 text-xl font-black text-slate-950">{customResult.topic} · {customResult.style}</h3>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{customResult.situation}</span>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Корейский вариант</p>
                    <p className="mt-2 text-lg font-bold leading-8 tracking-[-0.01em]">{customResult.korean}</p>
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <dt className="font-bold text-slate-500">Русское значение</dt>
                      <dd className="mt-1 leading-6 text-slate-800">{customResult.russian}</dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <dt className="font-bold text-slate-500">Романизация</dt>
                      <dd className="mt-1 leading-6 text-slate-800">{customResult.romanization}</dd>
                    </div>
                    <div className="rounded-2xl bg-indigo-50 p-3 sm:col-span-2">
                      <dt className="font-bold text-indigo-700">Почему такая вежливость подходит</dt>
                      <dd className="mt-1 leading-6 text-slate-800">{customResult.explanation}</dd>
                    </div>
                  </dl>

                  <button
                    onClick={copyCustomResult}
                    className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                  >
                    {copiedId === 'custom-result' ? 'Скопировано ✓' : 'Копировать корейский вариант'}
                  </button>
                </article>
              )}
            </section>

            {renderHistory()}
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
