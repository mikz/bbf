require 'bundler/setup'

require 'firebase'
require 'open-uri'
require 'nokogiri'
require 'securerandom'

base_uri = 'https://luminous-torch-2948.firebaseio.com/'

firebase = Firebase::Client.new(base_uri)

url = case lang = ENV.fetch('LANG') { raise "missing LANG param"}
  when 'ca' then 'http://barcelonabeerfestival.com/cerveses.html'
  when 'en' then 'http://barcelonabeerfestival.com/beers.html'
  when 'es' then 'http://barcelonabeerfestival.com/cervezas.html'
  else raise 'unknown language'
end

url = URI(url).freeze

website = open(url)
document = Nokogiri::HTML(website)


breweries = document.css('#main2').css('.box_cerveses')

img2color = ->(img) do
  case img[:src].match(%r{cerveses/(\d+).png})[1].to_i
    when 5 then 'dark'
    when 4 then 'brown'
    when 3 then 'amber'
    when 2 then 'pale'
    when 1 then 'white'
    else raise 'unknown color'
  end
end

ibu2num = ->(ibu) do
  case ibu.match(%r{IBU: (.+)})[1]
    when /(\d+)/ then $1.to_i
    when 'N/A' then nil
    else nil
  end
end

abv2num = ->(abv) do
  abv.tr(',', '.').to_f
end

img2token = ->(img) do
  img[:src].match(%r{cerveses/fitxa-(\d+).png})[1].to_i
end

breweries.each do |brewery|
  begin
    logo = url.merge brewery.at_css('.logo_beer-doble, .logo_beer').at_css('img')[:src]
  rescue URI::InvalidURIError
    logo = nil
  end

  puts logo

  company = brewery.at_css('.cervesera, .cervesera4').text.strip
  location = brewery.at_css('.procedencia').text.strip

  company, tap = company.split(' ALWAYS ON TAP ')

  tap = tap.to_i if tap

  puts company, location, tap.inspect

  brewer = { lang: lang, name: company, location: location, tap: tap, uuid: SecureRandom.uuid }
  firebase.push("#{lang}/breweries", brewer)

  beers = brewery.css('.contingut_beer')

  beers.each do |beer|
    number = beer.css('.num_beer').text.to_i
    name = beer.css('.num_beer + td').text
    style = beer.css('.estil').text
    description = beer.css('.text_beer').text.strip
    characteristics = beer.css('.caracteristicas')

    color = img2color.(characteristics.at_css('.color img'))

    abv, ibu = characteristics.css('.abv_ibu p').map(&:text)
    tokens = img2token.(characteristics.at_css('.fitxes img'))

    abv = abv2num.(abv)
    ibu = ibu2num.(ibu)

    firebase.push("#{lang}/beers", { lang: lang, brewery: brewer,
                             id: number, name: name, description: description,
                             style: style, color: color, tokens: tokens, abv: abv, ibu: ibu })

    puts number, name, description, style, color, "tokens: #{tokens}", abv, ibu
  end

  puts
end
