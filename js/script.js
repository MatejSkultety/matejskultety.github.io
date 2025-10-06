$('#exampleModal').on('show.bs.modal', function (event) {
  var modal = $(this);
  var button = $(event.relatedTarget);
  var recipient = button.data('whatever');
  var recipientImage = '';
  var recipientContent = '';

  if (recipient === 'JSON') {
    var jsonData = {
      "Price": "$2.50",
      "Configuration": "Single",
      "V(BR)DSS Min (V)": "900",
      "RDS(on) @ VGS = 10 V (mΩ)†": "0.05",
      "ID Max (A)": "100",
      "Qg @ VGS = 10 V (nC)†": "50",
      "VGS Max (V)": "20",
      "Technology": "MOSFET",
      "Package Type": "TO-220",
      "Ciss Typ (pF)": "1000",
      "VGS(th) Max (V)": "5",
      "PD Max (W)": "150",
      "RDS(on) Max @ VGS = 2.5 V  (mΩ)": "0.1",
      "RDS(on) Max @ VGS = 4.5 V  (mΩ)": "0.08",
      "Qg Typ @ VGS = 4.5 V (nC)": "40",
      "Coss Typ (pF)": "500",
      "Crss Typ (pF)": "200",
      "Qgd Typ @ VGS = 4.5 V (nC)": "30",
      "Qrr Typ (nC)": "10",
      "Qualification": "Automotive",
      "Tj Max (°C)": "150",
      "AEC Qualified": true,
      "PPAP Capable": true,
      "Halide Free": true,
      "Lead Free": true,
      "Status": "Active"
    };

    recipientImage = '';
    recipientContent = '<pre>' + JSON.stringify(jsonData, null, 2) + '</pre>';
  } else if (recipient === 'Diagram1') {
    recipientContent = '<img id="recipient-image" src="../images/diagram1.jpg" alt="Diagram 1 class="img-fluid"">';
  } else if (recipient === 'Diagram2') {
    recipientContent = '<img id="recipient-image" src="../images/diagram2.jpg" alt="Diagram 2" class="img-fluid">';
  } else if (recipient === 'Parsovanie Do JSON') {
    recipientContent = '<img id="recipient-image" src="../images/parsovanieDoJSON.jpg" alt="Parsovanie Do JSON" class="img-fluid">';
  }

  modal.find('.modal-title').text(recipient);
  modal.find('.modal-body').html(recipientContent);
  modal.find('.modal-body input').val(recipient);
});
