# sh /curl-scripts/characters/create.sh

API="http://localhost:4741"
URL_PATH="/characters"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "character": {
      "firstName": "'"${FIRST}"'",
      "lastName": "'"${LAST}"'",
      "homeBase": "'"${HOME}"'",
      "race": "'"${RACE}"'",
      "age": "'"${AGE}"'",
      "level": "'"${LEVEL}"'"
    }
  }'

echo
