import renderLeetCodeCard from "../src/cards/leetcode-card.js";
import { parseBoolean } from "../src/common/utils.js";
import fetchLeetCodeStats from "../src/fetchers/leetcode-fetcher.js";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const {
    username,
    theme,
    title_color,
    text_color,
    icon_color,
    ring_color,
    bg_color,
    border_color,
    hide_border,
    hide_title,
    custom_title,
    locale,
    card_width,
    border_radius,
    disable_animations,
  } = req.query;

  if (!username) {
    res.status(400).send("Missing username");
    return;
  }

  try {
    const data = await fetchLeetCodeStats({ username });
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800");
    res.send(
      renderLeetCodeCard(data, {
        theme,
        title_color,
        text_color,
        icon_color,
        ring_color,
        bg_color,
        border_color,
        hide_border: parseBoolean(hide_border),
        hide_title: parseBoolean(hide_title),
        custom_title,
        locale,
        card_width,
        border_radius,
        disable_animations: parseBoolean(disable_animations),
      }),
    );
  } catch (err) {
    res.status(404).send(err.message);
  }
};
