# sh /curl-scripts/characters/destroy.sh

API="http://localhost:4741"
URL_PATH="/characters"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \

echo
