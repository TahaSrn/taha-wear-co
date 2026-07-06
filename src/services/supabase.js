import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dlnqibtwodfwzosintdc.supabase.co";

const supabaseKey = "sb_publishable_qMPidSB78usw4rs7ej1kjg_qadqWRw7";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;