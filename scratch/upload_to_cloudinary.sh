#!/bin/bash
# Cloudinary Upload Script with Geo-Tagging
CLOUD_NAME="dzt4f9xdi"
API_KEY="925167551689975"
API_SECRET="Vg-EeGncY11t-L5Elh-CKcJvny4"
FOLDER="blog"

# Kaiserslautern GPS: 49.4447, 7.7689
KL_LAT="49.4447"
KL_LNG="7.7689"

upload_image() {
  local FILE_PATH="$1"
  local PUBLIC_ID="$2"
  local LAT="$3"
  local LNG="$4"
  local LOCATION="$5"
  
  local TIMESTAMP=$(date +%s)
  local CONTEXT="geo_lat=${LAT}|geo_lng=${LNG}|location=${LOCATION}|alt=Rezai Vision Videoproduktion ${LOCATION}"
  
  # Build params string for signature (alphabetically sorted, excluding file/api_key/resource_type/signature)
  local PARAMS="context=${CONTEXT}&folder=${FOLDER}&public_id=${PUBLIC_ID}&timestamp=${TIMESTAMP}"
  
  # Generate SHA1 signature
  local SIGNATURE=$(printf '%s%s' "${PARAMS}" "${API_SECRET}" | openssl sha1 -hex 2>/dev/null | awk '{print $NF}')
  
  echo "Uploading: ${FILE_PATH} -> ${FOLDER}/${PUBLIC_ID}"
  
  RESPONSE=$(curl -s -X POST "https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload" \
    -F "file=@${FILE_PATH}" \
    -F "api_key=${API_KEY}" \
    -F "timestamp=${TIMESTAMP}" \
    -F "signature=${SIGNATURE}" \
    -F "folder=${FOLDER}" \
    -F "public_id=${PUBLIC_ID}" \
    -F "context=${CONTEXT}")
  
  # Extract secure_url from response
  SECURE_URL=$(echo "$RESPONSE" | grep -o '"secure_url":"[^"]*"' | head -1 | cut -d'"' -f4)
  
  if [ -n "$SECURE_URL" ]; then
    echo "  ✅ Success: ${SECURE_URL}"
    echo "${PUBLIC_ID}|${SECURE_URL}" >> /Users/parsha/Downloads/rezaemotion/scratch/upload_results.txt
  else
    echo "  ❌ Error: $(echo "$RESPONSE" | head -c 200)"
    echo "${PUBLIC_ID}|ERROR|${RESPONSE}" >> /Users/parsha/Downloads/rezaemotion/scratch/upload_errors.txt
  fi
}

# Clear previous results
> /Users/parsha/Downloads/rezaemotion/scratch/upload_results.txt
> /Users/parsha/Downloads/rezaemotion/scratch/upload_errors.txt

echo "=== Starting Cloudinary Upload ==="
echo ""

# New blog images (all AI-generated → Kaiserslautern)
upload_image "public/images/blog/recruiting-pfalz.png" "Recruiting_Video_Pfalz_Kaiserslautern_Rezaivision" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/wedding-content.png" "Wedding_Content_Creator_Kaiserslautern_Hochzeit" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/artist-support.png" "Artist_Support_Musikvideo_RLP_Rezaivision" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/hybrid-video.png" "Hybrid_Video_KI_Produktion_Kaiserslautern" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/wedding-locations-kl.png" "Hochzeitslocation_Villa_Denis_Kaiserslautern" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/handwerk-recruiting.png" "Handwerk_Recruiting_Fachkraefte_Kaiserslautern" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/social-flatrate.png" "Social_Media_Flatrate_Unternehmen_Pfalz" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/authenticity-recruiting.png" "Authentische_Mitarbeitergewinnung_Kaiserslautern" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/music-locations-rlp.png" "Musikvideo_Locations_Rheinland_Pfalz" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/kmu-efficiency.png" "KMU_Content_Workflow_Kaiserslautern_Effizienz" "$KL_LAT" "$KL_LNG" "Kaiserslautern"

# Existing blog images (post-1 through post-10, also AI → Kaiserslautern)
upload_image "public/images/blog/post-1.png" "Blog_Videoproduktion_Kaiserslautern_Post1" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-2.png" "Blog_Corporate_Video_Kaiserslautern_Post2" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-3.png" "Blog_Social_Media_Marketing_Kaiserslautern_Post3" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-4.png" "Blog_Recruiting_Strategie_Kaiserslautern_Post4" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-5.png" "Blog_Hochzeitsvideo_Pfalz_Post5" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-6.png" "Blog_Musikvideo_Produktion_Post6" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-7.png" "Blog_Employer_Branding_Pfalz_Post7" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-8.png" "Blog_Content_Strategie_KMU_Post8" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-9.png" "Blog_Video_Marketing_Trends_Post9" "$KL_LAT" "$KL_LNG" "Kaiserslautern"
upload_image "public/images/blog/post-10.png" "Blog_Imagefilm_Rheinland_Pfalz_Post10" "$KL_LAT" "$KL_LNG" "Kaiserslautern"

echo ""
echo "=== Upload Complete ==="
echo "Results: scratch/upload_results.txt"
echo "Errors: scratch/upload_errors.txt"
