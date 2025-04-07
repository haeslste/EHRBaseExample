import axios from 'axios';

export async function postComposition() {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:8085/ehr/composition',
    {
      ehrId: '7c0d2a68-09cf-4a03-a7a6-e42c1242f21',
      templateId: 'body_weight',
      compositionJson: {
        "ctx/language": "en",
        "ctx/territory": "US",
        "ctx/composer_name": "Dr. Alice",
        "body_weight/body_weight/any_event/weight|magnitude": 75,
        "body_weight/body_weight/any_event/weight|unit": "kg"
      }
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
}
