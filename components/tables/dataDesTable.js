export default function DataDesTable() {
  return (
    <div className="rates__table">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='word-wrap'>Physical destruction</td>
                  <td>1 pc</td>
                  <td className="font-semibold">Ksh 1000</td>
                </tr>
                <tr>
                  <td className='word-wrap'>Data destruction by Degaussing (magnetic field distortion)</td>
                  <td>1 pc</td>
                  <td className="font-semibold">Ksh 1500</td>
                </tr>
                <tr>
                  <td className='word-wrap'>Digital shredding/wiping/killing by software (Blancco)</td>
                  <td>1 pc</td>
                  <td className="font-semibold">Ksh 5500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
