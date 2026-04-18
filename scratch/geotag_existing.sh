#!/bin/bash
CLOUD_NAME="dzt4f9xdi"
API_KEY="925167551689975"
API_SECRET="Vg-EeGncY11t-L5Elh-CKcJvny4"

tag() {
  local ID="$1"; local CTX="$2"; local LBL="$3"
  R=$(curl -s -u "${API_KEY}:${API_SECRET}" -X POST \
    "https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload/${ID}" \
    -d "context=${CTX}")
  if echo "$R" | grep -q '"context"'; then echo "  ✅ ${LBL}"; else echo "  ❌ ${LBL}"; fi
}

echo "=== Geo-Tagging ==="

# Social Care → Mainz
M="geo_lat=50.0012|geo_lng=8.2590|location=Mainz"
tag "Social_Care1_slwplk" "$M" "Social Care 1 → Mainz"
tag "Marcel_Social_care_2.1.1_phx9yw" "$M" "Social Care 2 → Mainz"
tag "Adonay_welde_social_care_1.12.1_d3uhxu" "$M" "Social Care 3 → Mainz"
tag "Social_CAre_3.1.1_upw3fj" "$M" "Social Care 4 → Mainz"

# Pfaff → KL + Bensheim
P="geo_lat=49.6816|geo_lng=8.6167|location=Kaiserslautern, Bensheim"
tag "pfaff1_2.3.1_hxcq6a" "$P" "Pfaff 1 → KL+Bensheim"
tag "pfaff_4_1.8.2_emhgzd" "$P" "Pfaff 2 → KL+Bensheim"
tag "pfaff2_1.9.1_aju6fd" "$P" "Pfaff 3 → KL+Bensheim"
tag "pfaff3_1.3.1_lv6rrj" "$P" "Pfaff 4 → KL+Bensheim"

# Default KL
K="geo_lat=49.4447|geo_lng=7.7689|location=Kaiserslautern"
tag "Hero_BG_bldaur" "$K" "Hero BG → KL"
tag "Parsha_Freisteller_Infusefilm_Kaiserslautern_Videoproduktion_oei9r3" "$K" "Parsha → KL"
tag "Ramin_jx1axc" "$K" "Ramin → KL"
tag "Adonay_W_bo3ddf" "$K" "Adonay → KL"
tag "David_Biniman_lxgt79" "$K" "David → KL"
tag "Parnaz_v5xc4c" "$K" "Parnaz → KL"
tag "Ralph_Nist_wmkjpf" "$K" "Ralph → KL"
tag "Aestethic_Ink_Kaiserslautern__ppagfi" "$K" "Aesthetic Ink 1 → KL"
tag "Aestethic_Ink_5_Kaiserslautern_e8isjk" "$K" "Aesthetic Ink 2 → KL"
tag "Ausethetik_INK_4_qnvksf" "$K" "Aesthetic Ink 3 → KL"
tag "AestethicInk_Kaiserslautern_2_h6yrms" "$K" "Aesthetic Ink 4 → KL"
tag "Behnke1_ao07wt" "$K" "Behnke → KL"
tag "KSB_KL_pttnwy" "$K" "KSB → KL"
tag "Social_Media_Retaeiner_mcphad" "$K" "Retainer → KL"
tag "Social_Media_Content_Videos_Reels_Rezaivision_Kaiserslautern_wvd12d" "$K" "Social Media Content → KL"
tag "Social_Media_Reels_Kaiserslautern_Rezaivision_Videoproduktion_fuer_Social_Media_ek3s0b" "$K" "Social Reels → KL"

# New blog images (already tagged during upload, but confirm)
tag "blog/Recruiting_Video_Pfalz_Kaiserslautern_Rezaivision" "$K" "Blog: Recruiting → KL"
tag "blog/Wedding_Content_Creator_Kaiserslautern_Hochzeit" "$K" "Blog: Wedding → KL"
tag "blog/Artist_Support_Musikvideo_RLP_Rezaivision" "$K" "Blog: Artist → KL"
tag "blog/Hybrid_Video_KI_Produktion_Kaiserslautern" "$K" "Blog: Hybrid → KL"
tag "blog/Hochzeitslocation_Villa_Denis_Kaiserslautern" "$K" "Blog: Villa Denis → KL"
tag "blog/Handwerk_Recruiting_Fachkraefte_Kaiserslautern" "$K" "Blog: Handwerk → KL"
tag "blog/Social_Media_Flatrate_Unternehmen_Pfalz" "$K" "Blog: Flatrate → KL"
tag "blog/Authentische_Mitarbeitergewinnung_Kaiserslautern" "$K" "Blog: Authentizität → KL"
tag "blog/Musikvideo_Locations_Rheinland_Pfalz" "$K" "Blog: Locations → KL"
tag "blog/KMU_Content_Workflow_Kaiserslautern_Effizienz" "$K" "Blog: KMU → KL"

echo ""
echo "=== All Done ==="
